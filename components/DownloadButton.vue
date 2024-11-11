<script setup lang="ts">
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
            <Icon name="material-symbols:download" class="size-8" />
            MP3
        </button>
    </div>
</template>
