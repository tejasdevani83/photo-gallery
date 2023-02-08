export interface ImagesResponseData {
  'id': string,
  'url': string,
  'filename': string,
  'description': string,
  'uploadedBy': string,
  'createdAt': string,
  'updatedAt': string,
  'dimensions': {
    'height': number,
    'width': number
  },
  'resolution': {
    'height': number,
    'width': number
  },
  'sizeInBytes': number,
  'sharedWith': [],
  'favorited': boolean
}