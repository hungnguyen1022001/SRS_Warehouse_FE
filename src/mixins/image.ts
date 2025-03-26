export const convertImageToObject = (image: any) => {
    if (!image) return null;
    return {
        id: image.media_id ?? image.id,
        url: image.url,
        alt: "",
        alt_image: ""
    }
}

export const getPathFromObject = (image: any) => {
    if (!image) return null;
    return image.url
}