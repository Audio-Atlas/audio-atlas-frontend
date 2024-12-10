<script setup lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  cleanFilename,
  downloadAudioClip,
  fetchClip,
  millisecondsToSeconds,
} from "~/aa-util";

const props = defineProps<{
  audioId: string;
  name: string;
  similarity: number;
  playingClip: boolean;
  onSetPlaying: (audioId: string | null) => void;
}>();

const playhead = ref(0);
const audioObj = ref<HTMLAudioElement | null>(null);
const blob = ref<Blob | null>(null);
const clipDuration = ref(10000);

const onDownloadClip = (format: "mp3" | "wav") => {
  downloadAudioClip(props.audioId, props.name, format);
};

const onSetPlayingAudio = (bool: boolean, time: number) => {
  if (bool) {
    props.onSetPlaying(props.audioId);
    playAudioAtTime(time);
  } else {
    pauseAudio();
    props.onSetPlaying(null);
  }
};

const playAudioAtTime = (time: number) => {
  if (audioObj.value) {
    if (time >= clipDuration.value - 0.01) {
      time = 0;
    }
    audioObj.value.currentTime = time;
    playhead.value = time;
    audioObj.value.play();
    trackPlayhead();
  } else {
    console.error("Play: Audio object for " + props.audioId + " is null");
  }
};

const pauseAudio = () => {
  if (!audioObj.value) {
    console.error('Pause" Audio object for ' + props.audioId + " is null");
    return;
  }
  playhead.value = audioObj.value.currentTime;
  audioObj.value.pause();
};

const getClipDuration = async () => {
  if (!blob.value) {
    console.error("Get duration: Blob for " + props.audioId + " is null");
    return;
  }
  const arrayBuffer = await blob.value.arrayBuffer();
  const audioContext = new AudioContext();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  clipDuration.value = audioBuffer.duration;
};

const trackPlayhead = async () => {
  // when a clip starts, every 5ms update the playhead to the current time
  if (!audioObj.value) {
    console.error(
      "Track playhead: Audio object for " + props.audioId + " is null",
    );
    return;
  }
  const interval = setInterval(() => {
    if (!audioObj.value) {
      clearInterval(interval);
      console.error(
        "Track playhead: Audio object for " + props.audioId + " is null",
      );
      return;
    }
    if (audioObj.value.currentTime >= clipDuration.value - 0.01) {
      clearInterval(interval);
      props.onSetPlaying(null);
      return;
    }
    if (!props.playingClip) {
      clearInterval(interval);
      return;
    }
    playhead.value = audioObj.value.currentTime;
  }, 5);
  audioObj.value.onended = () => {
    clearInterval(interval);
    props.onSetPlaying(null);
  };
};

watch(
  () => props.playingClip,
  (playing) => {
    if (playing) {
      playAudioAtTime(playhead.value);
    } else {
      pauseAudio();
    }
  },
);

onMounted(() => {
  fetchClip(props.audioId, "wav").then((clip) => {
    if (!clip) {
      console.error("Mount: Failed to fetch clip for " + props.audioId);
      return;
    }
    blob.value = clip;
    audioObj.value = new Audio(URL.createObjectURL(clip));
    audioObj.value.onended = () => {
      props.onSetPlaying(null);
    };
    getClipDuration();
  });
});

onUnmounted(() => {
  pauseAudio();
});
</script>

<template>
  <div
    class="flex h-1/5 w-full flex-row items-center gap-4 rounded-md border border-primary/75 px-6 py-4"
  >
    <div class="flex w-1/12 items-center gap-2">
      <button
        class="size-20 cursor-pointer text-muted-foreground transition-all duration-200 hover:text-primary"
        :class="{ 'text-primary': playingClip }"
        @click="() => onSetPlayingAudio(!playingClip, playhead)"
      >
        <IconsPlayCircleOutline v-if="!playingClip" class="size-full" />
        <IconsPauseCircleOutline v-else class="size-full" />
      </button>
    </div>
    <div class="flex h-24 w-9/12 flex-col items-start gap-4">
      <TooltipProvider class="h-1/3">
        <Tooltip>
          <TooltipTrigger>
            <h3 class="w-full text-lg font-bold">
              {{ cleanFilename(props.name) }}
            </h3>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {{ props.name }}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div class="flex w-full flex-row items-center gap-4">
        <div class="flex w-1/6 flex-col items-center gap-1">
          <p class="w-full text-sm">
            {{ millisecondsToSeconds(clipDuration * 1000) }}s
          </p>
          <p class="w-full text-sm">{{ props.similarity }}% match</p>
        </div>
        <QueryWaveform
          :on-play-at-time="(time) => onSetPlayingAudio(true, time)"
          :playhead="playhead"
          :duration="clipDuration"
          :audio-blob="blob"
        />
      </div>
    </div>

    <div class="ml-4 flex items-center gap-4">
      <Button
        variant="ghost"
        class="bg-transparent hover:bg-primary hover:text-primary-foreground"
        size="lg"
        @click="() => onDownloadClip('mp3')"
      >
        MP3
      </Button>

      <Button
        variant="ghost"
        class="bg-transparent hover:bg-primary hover:text-primary-foreground"
        size="lg"
        @click="() => onDownloadClip('wav')"
      >
        WAV
      </Button>
    </div>
  </div>
</template>
