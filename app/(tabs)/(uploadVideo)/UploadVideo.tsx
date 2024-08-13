import React from 'react';
import { Button } from 'react-native';
import useUploadVideo from './useUploadVideo';

const UploadVideo = ({ onFileSelect }) => {
    const {pickVideo} = useUploadVideo(onFileSelect)
    return <Button title="Pick Video" onPress={pickVideo} />;
};

export default UploadVideo;


