import { ImagesResponseData } from '@/interfaces/gallery'
import { setFavoritedPhotos, setPhotos } from '@/store/slices/photoSlice'
import { StoreStateType } from '@/store/store'
import { sortImages, truncate } from '@/utils/misc'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Heart from './icons/Heart'
import RedHeart from './icons/RedHeart'

type DetailedImageProps = {
  openedImageDetails: ImagesResponseData
}

const DetailedImage = ({ openedImageDetails }: DetailedImageProps) => {
  const dispatch = useDispatch()
  const favoritedImages = useSelector<StoreStateType, ImagesResponseData[]>(
    (state) => state.photoSlice.favoritedPhotos,
  );
  const recentlyAddedImages = useSelector<StoreStateType, ImagesResponseData[]>(
    (state) => state.photoSlice.photos,
  );

  const toggleFavorite = () => {
    if (openedImageDetails.favorited) {
      const removedFavoriteImage = [
        ...favoritedImages.filter((i) => i.id !== openedImageDetails.id),
      ]
      dispatch(setFavoritedPhotos(removedFavoriteImage))
    } else {
      const addedToFavorited = [...favoritedImages, openedImageDetails]
      dispatch(setFavoritedPhotos(addedToFavorited))
    }
    dispatch(setPhotos(sortImages([
      ...recentlyAddedImages.filter((i) => i.id !== openedImageDetails.id),
      { ...openedImageDetails, favorited: !openedImageDetails.favorited }
    ])))
  }

  const deleteImage = (img: ImagesResponseData) => {
    dispatch(setPhotos(recentlyAddedImages.filter((image) => image.id !== img.id)))
    if (img.favorited) {
      dispatch(setFavoritedPhotos([...favoritedImages.filter((image) => image.id !== img.id)]))
    }
  }

  return (
    <div>
      {openedImageDetails &&
        <div className='row flex-col'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className='single-display-image'
            src={openedImageDetails.url}
            alt={openedImageDetails.filename}
            height={230}
          />
          <div className='image-details-container'>
            <div className='image-name-size'>
              <div className='favorite-image-wrapper'>
                <h2>{truncate(openedImageDetails.filename)}</h2>
                <div className='heart-icon'>
                  <button className='heart-icon-button' onClick={toggleFavorite}>
                    {!openedImageDetails.favorited ?
                      <Heart width='20' height='20' /> :
                      <RedHeart width='20' height='20' />
                    }
                  </button>
                </div>
              </div>
              <span className='image-size'>{(openedImageDetails.sizeInBytes / 1000000).toFixed(2)} MB</span>
            </div>
            <div className='info-container'>
              <h3 className='info-title'>Information</h3>
              <div className='info-subcontainer'>
                <div>
                  <p className='info-subtitle'>Uploaded by</p>
                </div>
                <div>
                  <p className='info-value'>
                    {openedImageDetails.uploadedBy}
                  </p>
                </div>
              </div>
              <div className='info-subcontainer'>
                <div>
                  <p className='info-subtitle'>Created</p>
                </div>
                <div>
                  <p className='info-value'>
                    {new Date(openedImageDetails.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className='info-subcontainer'>
                <div>
                  <p className='info-subtitle'>Last modified</p>
                </div>
                <div>
                  <p className='info-value'>
                    {new Date(openedImageDetails.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className='info-subcontainer'>
                <div>
                  <p className='info-subtitle'>Dimensions</p>
                </div>
                <div>
                  <p className='info-value'>
                    {openedImageDetails?.dimensions.width}
                    <span> &#215; </span>
                    {openedImageDetails?.dimensions.height}
                  </p>
                </div>
              </div>
              <div className='info-subcontainer'>
                <div>
                  <p className='info-subtitle'>Resolution</p>
                </div>
                <div>
                  <p className='info-value'>
                    {openedImageDetails?.resolution.width}
                    <span> &#215; </span>
                    {openedImageDetails?.resolution.height}
                  </p>
                </div>
              </div>
              {openedImageDetails?.description &&
                <div className='info-container description-container'>
                  <h3 className='info-title'>
                    Description
                  </h3>
                  <div>
                    <p>{openedImageDetails.description}</p>
                  </div>
                </div>
              }
              <div className={`delete-button ${!openedImageDetails?.description ? 'delete-button-spacing' : ''}`}>
                <button type='button' className='delete-image-button' onClick={() => { deleteImage(openedImageDetails) }}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      }
    </div >
  )
}

export default DetailedImage