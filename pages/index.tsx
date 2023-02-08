/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from 'react-query';
import GalleryApi from '@/api/gallery';
import { setFavoritedPhotos, setPhotos } from '@/store/slices/photoSlice';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { StoreStateType } from '@/store/store';
import { ImagesResponseData } from '@/interfaces/gallery';
import { Tab, TabContainer, TabPanel } from '@/components/generic/Tabs';
import { ImageName, PhotoGridContainer, PhotoGridItem } from '@/components/generic/PhotoGrid';
import { Container } from '@/components/generic/Container';
import DetailedImage from '@/components/DetailedImage';
import Link from 'next/link';
import { sortImages, truncate } from '@/utils/misc';

const Home = () => {
  const [selectedTab, setSelectedTab] = React.useState('Recently Added');

  const dispatch = useDispatch()

  const recentlyAddedImages = useSelector<StoreStateType, ImagesResponseData[]>(
    (state) => state.photoSlice.photos,
  );
  const favoritedImages = useSelector<StoreStateType, ImagesResponseData[]>(
    (state) => state.photoSlice.favoritedPhotos,
  );
  const [activeImage, setActiveImage] = React.useState<ImagesResponseData>({} as ImagesResponseData);

  const getAllImages = useMutation(
    async () => {
      const res = GalleryApi.fetchImages();
      return res;
    },
    {
      mutationKey: 'all-images-with-description',
      onSuccess: (res) => {
        const sortedImages = sortImages(res.data)
        dispatch(setPhotos(sortedImages));
        dispatch(setFavoritedPhotos(res.data.filter((image) => image.favorited)));
        setActiveImage(sortedImages[0])
      },
    },
  );

  React.useEffect(() => {
    if (recentlyAddedImages.length == 0) {
      getAllImages.mutate()
    }
  }, [])

  React.useMemo(() => {
    const updatedActiveImage = recentlyAddedImages.find((i) => i.id === activeImage?.id)
    if (updatedActiveImage !== undefined) {
      setActiveImage(updatedActiveImage)
    }
    setActiveImage(recentlyAddedImages[0])
  }, [recentlyAddedImages])

  const findActiveImage = (image: ImagesResponseData) => {
    const activeImage = recentlyAddedImages.find((i) => i.id === image.id)
    if (activeImage !== undefined) {
      setActiveImage(activeImage)
    }
  }

  return (
    <Container>
      <div className="row">
        <div className="photos-container">
          <h1>Photos</h1>
          <TabContainer>
            <Tab
              active={selectedTab === 'Recently Added'}
              onClick={() => setSelectedTab('Recently Added')}
            >
              Recently Added
            </Tab>
            <Tab
              active={selectedTab === 'Favorited'}
              onClick={() => setSelectedTab('Favorited')}
            >
              Favorited
            </Tab>
          </TabContainer>
          <TabPanel hidden={selectedTab !== 'Recently Added'}>
            <PhotoGridContainer>
              {recentlyAddedImages.length > 0 ?
                recentlyAddedImages.map((image) => (
                  <PhotoGridItem key={image.id}>
                    <div className='image-wrapper'>
                      <Link
                        href=""
                        role={'button'}
                        onClick={() =>
                          findActiveImage(image)
                        }
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          className={`grid-image ${activeImage?.id === image.id ? 'grid-image-active' : ''}`}
                          src={image.url}
                          alt={image.filename}
                          height={120}
                        />
                      </Link>
                      <div>
                        <ImageName>{truncate(image.filename)}</ImageName>
                        <span className='image-size'>{(image.sizeInBytes / 1000000).toFixed(2)} MB</span>
                      </div>
                    </div>
                  </PhotoGridItem>
                )) : 'No images available'}
            </PhotoGridContainer>
          </TabPanel>
          <TabPanel hidden={selectedTab !== 'Favorited'}>
            <PhotoGridContainer>
              {favoritedImages.length > 0 ?
                favoritedImages.map((image) => (
                  <PhotoGridItem key={image.id}>
                    <div className='image-wrapper'>
                      <Link
                        href=""
                        role={'button'}
                        onClick={() =>
                          findActiveImage(image)
                        }
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          className={`grid-image ${activeImage?.id === image.id ? 'grid-image-active' : ''}`}
                          src={image.url}
                          alt={image.filename}
                          height={120}
                        />
                      </Link>
                      <div>
                        <ImageName>{truncate(image.filename)}</ImageName>
                        <span className='image-size'>{(image.sizeInBytes / 1000000).toFixed(2)} MB</span>
                      </div>
                    </div>
                  </PhotoGridItem>
                )) : 'No images available'}
            </PhotoGridContainer>
          </TabPanel>
        </div>
        <div className="single-photo-container">
          <DetailedImage openedImageDetails={activeImage} />
        </div>
      </div>
    </Container>
  )
}

export default Home;
