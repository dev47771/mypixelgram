export type Area = {
   x: number
   y: number
   width: number
   height: number
}

export type CropState = {
   crop: { x: number; y: number }
   zoomScale: number[]
   aspect: number | undefined
   naturalAspect: number | undefined
   croppedAreaPixels: Area | null
}

export type CroppingState = {
   showZoomScale: boolean
   showAspectRatio: boolean
   showImageGallery: boolean
   isEditingMode: boolean
   imageStates: { [index: number]: CropState }
}

export type CroppingAction =
   | { type: 'SET_CROP'; payload: { index: number; crop: { x: number; y: number } } }
   | { type: 'SET_ASPECT'; payload: { index: number; aspect: number | undefined } }
   | { type: 'SET_ZOOM_SCALE'; payload: { index: number; zoomScale: number[] } }
   | { type: 'TOGGLE_ZOOM_SCALE' }
   | { type: 'TOGGLE_ASPECT_RATIO' }
   | { type: 'TOGGLE_IMAGE_GALLERY' }
   | { type: 'TOGGLE_EDITING_MODE' }
   | { type: 'INIT_IMAGE_STATE'; payload: { index: number; naturalAspect: number } }
   | { type: 'SET_CROPPED_AREA'; payload: { index: number; croppedAreaPixels: Area } }
   | { type: 'CLOSE_ALL_PANELS' }

export const initialState: CroppingState = {
   showZoomScale: false,
   showAspectRatio: false,
   showImageGallery: false,
   isEditingMode: false,
   imageStates: {},
}

export function croppingReducer(state: CroppingState, action: CroppingAction): CroppingState {
   switch (action.type) {
      case 'SET_CROP':
         return {
            ...state,
            imageStates: {
               ...state.imageStates,
               [action.payload.index]: {
                  ...state.imageStates[action.payload.index],
                  crop: action.payload.crop,
               },
            },
         }
      case 'SET_ASPECT':
         return {
            ...state,
            imageStates: {
               ...state.imageStates,
               [action.payload.index]: {
                  ...state.imageStates[action.payload.index],
                  aspect: action.payload.aspect,
               },
            },
         }
      case 'SET_ZOOM_SCALE':
         return {
            ...state,
            imageStates: {
               ...state.imageStates,
               [action.payload.index]: {
                  ...state.imageStates[action.payload.index],
                  zoomScale: action.payload.zoomScale,
               },
            },
         }
      case 'CLOSE_ALL_PANELS':
         return {
            ...state,
            showZoomScale: false,
            showAspectRatio: false,
            showImageGallery: false,
            isEditingMode: false,
         }

      case 'TOGGLE_EDITING_MODE':
         return { ...state, isEditingMode: !state.isEditingMode }

      case 'TOGGLE_ZOOM_SCALE':
         return {
            ...state,
            showZoomScale: !state.showZoomScale,
            showAspectRatio: false,
            showImageGallery: false,
            isEditingMode: !state.showZoomScale,
         }

      case 'TOGGLE_ASPECT_RATIO':
         return {
            ...state,
            showAspectRatio: !state.showAspectRatio,
            showZoomScale: false,
            showImageGallery: false,
            isEditingMode: !state.showAspectRatio,
         }

      case 'TOGGLE_IMAGE_GALLERY':
         return {
            ...state,
            showImageGallery: !state.showImageGallery,
            showAspectRatio: false,
            showZoomScale: false,
            isEditingMode: false,
         }
      case 'INIT_IMAGE_STATE':
         return {
            ...state,
            imageStates: {
               ...state.imageStates,
               [action.payload.index]: {
                  crop: { x: 0, y: 0 },
                  zoomScale: [0],
                  aspect: action.payload.naturalAspect,
                  naturalAspect: action.payload.naturalAspect,
                  croppedAreaPixels: null,
               },
            },
         }
      case 'SET_CROPPED_AREA':
         return {
            ...state,
            imageStates: {
               ...state.imageStates,
               [action.payload.index]: {
                  ...state.imageStates[action.payload.index],
                  croppedAreaPixels: action.payload.croppedAreaPixels,
               },
            },
         }
      default:
         return state
   }
}
