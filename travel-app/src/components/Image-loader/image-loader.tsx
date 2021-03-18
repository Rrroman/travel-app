import React from 'react';
import { connect } from 'react-redux';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import AuthService from '../../services/auth-service';
import * as actions from '../../actions/user-actions';
import { UserStateType } from '../../reducers/user-reducer';
import { RootStateType } from '../../reducers/root-reducer';
import { CountriesStateType } from '../../reducers/country-reducer';
import styles from './image-loader.module.css';

type MapDispatchToProps = {
  userFotoAd: (file: string) => actions.UserActionType;
};

const errMsg = {
  en: 'image size should not be more than 1MB',
  ru: 'размер изображения не должен быть больше 1Мб',
  uk: 'розмір зображення не повинен бути більше 1 Мб',
};

type Props = UserStateType & MapDispatchToProps & CountriesStateType;

const ImageLoader: React.FC<Props> = ({
  userFotoAd,
  userLogin,
  file,
  selectedLanguage,
}) => {
  const [images, setImages] = React.useState([]);

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined,
  ) => {
    setImages(imageList as never[]);
    const authService = new AuthService();
    authService
      .updateImage(imageList[0].dataURL, userLogin)
      .then((data) => {
        userFotoAd(data.data);
      })
      .catch((err) => {
        alert(errMsg[selectedLanguage]);
      });
  };

  return (
    <div className="App">
      <ImageUploading multiple={false} value={images} onChange={onChange}>
        {({ imageList, onImageUpload }) => (
          <div className="upload__image-wrapper">
            {file ? (
              <img
                src={`data:image/png;base64,${file}`}
                alt=""
                className={styles['profile-img']}
                width="100"
                onClick={onImageUpload}
              />
            ) : (
              <AddPhotoAlternateIcon
                style={{ fontSize: 60 }}
                onClick={onImageUpload}
              />
            )}
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

const mapStateToProps = (state: RootStateType) => {
  return { ...state.userState, ...state.countryState };
};

export default connect(mapStateToProps, actions)(ImageLoader);
