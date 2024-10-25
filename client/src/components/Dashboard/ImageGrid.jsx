import React from 'react'

export default function ImageGrid({images}) {
  return (
    <>
    <div class="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-7 md:grid-cols-4">
            {
                images ? images.map((image) => (
                    <div>
                        <img class="w-full h-40 max-w-full rounded-lg hover:opacity-75 hover:border border-green-600 hover:shadow-lg hover:cursor-pointer"
                            src={image.image}
                            alt="gallery-photo" />
                        <h6>{image.title}</h6>
                    </div>
                )) : 
                 <p>No images</p>
            }
        </div>
    </>
  )
}
