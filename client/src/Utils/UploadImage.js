export const ImageUplaod = async (image, video) => {
    let result;

    console.log(image)

    // try {
    //     const data = new FormData();
    //     data.append('file', image);
    //     data.append('upload_preset', 'wyzazr5b');
    //     data.append('cloud_name', 'duextvtta');

    //     const res = await fetch("https://api.cloudinary.com/v1_1/duextvtta/image/upload", {
    //         method: 'post',
    //         body: data
    //     });

    //     result = await res.json();
    // } catch (error) {
    //     console.error('Error uploading image:', error);
    // }

    return result?.url;
};
