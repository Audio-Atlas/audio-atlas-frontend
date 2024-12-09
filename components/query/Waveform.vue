<script lang="ts" setup>
const props = defineProps<{
  playhead: number;
  duration: number;
  onPlayAtTime: (time: number) => void;
  audioBlob: Blob | null;
}>();

const NUM_BARS = 100;
const waveform = ref<number[]>([]);
const maxAmplitude = ref(0);
const cursorLocation = ref(-1);

const getWaveformArray = async (blob: Blob) => {
  // read the blob as an array buffer
  // then convert the array buffer to a waveform array
  // then set the waveform ref to the waveform array

  const arrayBuffer = await blob.arrayBuffer();
  const audioContext = new AudioContext();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  const channelData = audioBuffer.getChannelData(0);
  const samples = channelData.length;
  const samplesPerBar = Math.floor(samples / NUM_BARS);

  const waveformArray = [];
  for (let i = 0; i < NUM_BARS; i++) {
    const start = i * samplesPerBar;
    const end = (i + 1) * samplesPerBar;
    const barData = channelData.slice(start, end);
    let barAmplitude =
      barData.reduce((acc, val) => acc + Math.abs(val), 0) / barData.length;
    if (barAmplitude < 0.0001) {
      barAmplitude = 0.0001;
    }
    if (barAmplitude > maxAmplitude.value) {
      maxAmplitude.value = barAmplitude;
    }
    waveformArray.push(barAmplitude);
  }

  // clean up the max amplitude
  maxAmplitude.value = Math.min(1, Math.max(0.1, maxAmplitude.value * 1.5));
  waveform.value = waveformArray;
};

// watch for changes in the audioBlob prop
watch(
  () => props.audioBlob,
  (blob) => {
    if (blob) {
      getWaveformArray(blob);
    }
  },
);

const onMouseMove = (e: MouseEvent) => {
  // get the x position of the mouse relative to the waveform
  // @ts-expect-error - getBoundingClientRect is a valid method, idk why it's not recognized
  const boundingRect = e?.currentTarget?.getBoundingClientRect();
  if (!boundingRect) {
    return;
  }
  const x = e.clientX - boundingRect.left;
  if (x < 0 || x > boundingRect.width) {
    cursorLocation.value = -1;
    return;
  }
  cursorLocation.value = x;
};

const onMouseLeave = () => {
  cursorLocation.value = -1;
};

const onClick = (e: MouseEvent) => {
  // get the x position of the mouse relative to the waveform
  // @ts-expect-error - getBoundingClientRect is a valid method, idk why it's not recognized
  const boundingRect = e?.currentTarget?.getBoundingClientRect();
  if (!boundingRect) {
    return;
  }
  const x = e.clientX - boundingRect.left;
  if (x < 0 || x > boundingRect.width) {
    return;
  }
  const time = (x / boundingRect.width) * props.duration;
  props.onPlayAtTime(time);
};
</script>
<!-- 
    This component should display the waveform of an audio clip.
    The waveform is a horizxontal list of n vertical bars, each representing the amplitude of the audio at that point in time.
    There should be an overlay element that shows the current playhead position.
    The waveform should be interactive, allowing the user to click and drag to change the playhead position.
    -->
<template>
  <div
    class="relative size-full"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
    @click="onClick"
  >
    <div
      id="bars"
      class="flex h-full max-h-[72px] flex-row items-center justify-between"
    >
      <div
        v-for="(bar, i) in waveform"
        :key="i"
        class="inline-block h-full w-[3px] rounded-lg bg-primary"
        :style="{
          height: `${(bar / maxAmplitude) * 100}%`,
        }"
      />
    </div>
    <div
      id="trackingOverlay"
      class="absolute left-0 top-0 h-full bg-[rgba(0,0,0,0.2)]"
      :style="{
        width: `${(props.playhead / duration) * 100}%`,
      }"
    >
      <div
        v-if="props.playhead > 0"
        id="playhead"
        class="absolute right-0 top-0 h-full w-1 bg-[#68A6D8]"
      />
    </div>
    <div
      v-if="cursorLocation >= 0"
      id="cursor"
      class="absolute right-0 top-0 h-full w-px bg-[red]"
      :style="{
        left: `${cursorLocation}px`,
      }"
    />
  </div>
</template>
