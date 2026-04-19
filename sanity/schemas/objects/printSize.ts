import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'printSize',
  title: 'Print Size',
  type: 'object',
  preview: {
    select: {
      label: 'label',
      widthCm: 'widthCm',
      heightCm: 'heightCm',
    },
    prepare({ label, widthCm, heightCm }) {
      return {
        title: label || `${widthCm}x${heightCm}cm`,
      }
    },
  },
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'e.g. "60x40cm"',
    }),
    defineField({
      name: 'widthCm',
      title: 'Width (cm)',
      type: 'number',
    }),
    defineField({
      name: 'heightCm',
      title: 'Height (cm)',
      type: 'number',
    }),
    defineField({
      name: 'papers',
      title: 'Papers',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Hahnemuhle Photo Rag', value: 'hahnemuhle-photo-rag' },
          { title: 'Hahnemuhle Baryta', value: 'hahnemuhle-baryta' },
          { title: 'Canson Platine Fibre Rag', value: 'canson-platine-fibre-rag' },
          { title: 'Canson Rag Photographique', value: 'canson-rag-photographique' },
          { title: 'Fuji Crystal Archive', value: 'fuji-crystal-archive' },
        ],
      },
    }),
    defineField({
      name: 'frames',
      title: 'Frames',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Unframed', value: 'unframed' },
          { title: 'Black Oak', value: 'black-oak' },
          { title: 'Natural Oak', value: 'natural-oak' },
          { title: 'White Oak', value: 'white-oak' },
          { title: 'Walnut', value: 'walnut' },
          { title: 'Aluminium', value: 'aluminium' },
        ],
      },
    }),
  ],
})
