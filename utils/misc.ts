import { ImagesResponseData } from '@/interfaces/gallery';

const truncate = (str: string) => {
  return str && str.length > 20
    ? `${str.slice(0, 20)}...`
    : str;
}

const sortImages = (images: ImagesResponseData[]) => {
  const sortedImgs = images.sort((a, b) => {
    const dateA = new Date(a.createdAt)
    const dateB = new Date(b.createdAt)

    if (dateA > dateB) return 1;
    if (dateA < dateB) return -1;
    return 0;
  })
  return sortedImgs;
}

export { truncate, sortImages };