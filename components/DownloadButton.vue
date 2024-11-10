<script setup lang="ts">
import DownloadIcon from 'vue-material-design-icons/Download.vue'

const props = defineProps<{
    url: string
}>()

const onDownload = () => {
    window.open(props.url, '_blank')
}
</script>

<template>
    <div
    class="
        flex
        items-center
        gap-2
    ">
        <button
        class="
            flex
            items-center
            gap-2 border
            border-white
            px-6
            py-3
            text-white
        "
        @click="onDownload">
            <DownloadIcon/>
            MP3
        </button>
    </div>
</template>
