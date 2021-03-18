import React from 'react';
import styles from './video-start.module.css';
import { useTranslation } from 'react-i18next';
import shortTrackUrl from '../../assets/video/short-track.mp4';

const VideoStart: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles['video-wrapper']}>
      <video loop autoPlay muted className={styles['video-size']}>
        <source src={shortTrackUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styles['video-text']}>
        <h3 className={styles['video-header']}>
          {t('auth-page.video-start.header1')}
        </h3>
        <h3 className={styles['video-header']}>
          {t('auth-page.video-start.header2')}
        </h3>
        <p className={styles['video-ptext']}>
          {t('auth-page.video-start.text-p')}
        </p>
      </div>
    </div>
  );
};

export default VideoStart;
