import React, { useEffect, useRef, useState } from 'react';
import {showFail} from '../../utils/toast';
import styles from './info.module.scss';
import { Button } from 'antd-mobile';
import { getUserMediaStream } from '../../utils/getUserMediaStream';
import {shibie} from '../../utils/request';

export default ({setIsShowCamera}) => {
    const [videoHeight, setVideoHeight] = useState(0);
    const ref = useRef(null);
    const _canvas = useRef(null);

    useEffect(() => {
        const video = document.getElementById('video');
        const rectangle = document.getElementById('capture-rectangle');
        const container = document.getElementById('container');
        _canvas.current = document.createElement('canvas');
        // _canvas.current.style.display = 'block';

        getUserMediaStream(video)
            .then(() => {
                setVideoHeight(video.offsetHeight);
                startCapture();
            })
            .catch(err => {
                showFail({
                    text: '无法调起后置摄像头，请点击相册，手动上传身份证',
                    duration: 6,
                });
            });

        /**
         * 获取video中对应的真实size
         */
        function getRealSize() {

            return {
                getHeight: height => {
                    const { videoHeight: vh, videoWidth: vw, offsetHeight: oh, offsetWidth: ow } = video;
                    return (vh / oh) * height;
                },
                getWidth: width => {
                    const { videoHeight: vh, videoWidth: vw, offsetHeight: oh, offsetWidth: ow } = video;

                    return (vw / ow) * width;
                },
            };
        }

        function isChildOf(child, parent) {
            var parentNode;
            if (child && parent) {
                parentNode = child.parentNode;
                while (parentNode) {
                    if (parent === parentNode) {
                        return true;
                    }
                    parentNode = parentNode.parentNode;
                }
            }
            return false;
        }

        function startCapture() {
            ref.current = setInterval(() => {
                const { getHeight, getWidth } = getRealSize();
                /** 获取框的位置 */
                const { left, top, width, height } = rectangle.getBoundingClientRect();

                /** 测试时预览 */
                // if (isChildOf(_canvas.current, container)) {
                //     container.removeChild(_canvas.current);
                // }
                // container.appendChild(_canvas.current);

                const context = _canvas.current.getContext('2d');
                _canvas.current.width = width;
                _canvas.current.height = height;
                console.log(height, width, getHeight(height), getWidth(width));
                context.drawImage(
                    video,
                    left + window.scrollX,
                    top + window.scrollY,
                    Math.floor(getWidth(width) - 1),
                    Math.floor(getHeight(height) - 1),
                    0,
                    0,
                    width,
                    height,
                );

                const base64 = _canvas.current.toDataURL('image/jpeg');
                // TODO 此处可以根据需要调用OCR识别接口
            }, 200);
        }

        /** 防止内存泄露 */
        return () => clearInterval(ref.current);
    }, []);

    const startOcr = async () => {
        const base64 = _canvas.current.toDataURL('image/jpeg');
        const res = await shibie(base64);
        alert(JSON.stringify(res));
        // setsrc(base64);
        // setIsShowCamera(false);
    };

    return (
        <div id="container" className={styles.container}>
            <video id="video" autoPlay muted playsInline style={{width: '100%',}} />
            <div id="capture-rectangle" className={styles['capture-rectangle']} />
            <Button onClick={startOcr} className={styles["pick-btn"]}>扫描确认</Button>
        </div>
    );
};

/**
 * 从本地上传
 */
function CustomUpload(customUploadProps) {
    return (
        <input className={styles['input']} type="file" {...customUploadProps} />
    );
}
