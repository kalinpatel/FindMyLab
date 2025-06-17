import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

export const Departments = {
  ACES: { fullName: 'Agricultural Consumer and Environmental Sciences', abbreviation: 'ACES' },
  AHS: { fullName: 'Applied Health Sciences', abbreviation: 'AHS' },
  ARMED_FORCES: { fullName: 'Armed Forces', abbreviation: 'Armed Forces' },
  CARLE: { fullName: 'Carle Illinois College of Medicine', abbreviation: 'Medicine' },
  MEDIA: { fullName: 'College of Media', abbreviation: 'Media' },
  DGS: { fullName: 'Division of General Studies', abbreviation: 'DGS' },
  EDUCATION: { fullName: 'College of Education', abbreviation: 'Education' },
  FAA: { fullName: 'College of Fine and Applied Arts', abbreviation: 'FAA' },
  GIES: { fullName: 'Gies College of Business', abbreviation: 'Gies' },
  GRADUATE: { fullName: 'Graduate College', abbreviation: 'Graduate College' },
  GRAINGER: { fullName: 'Grainger College of Engineering', abbreviation: 'Grainger' },
  LAW: { fullName: 'College of Law', abbreviation: 'Law' },
  LAS: { fullName: 'College of Liberal Arts and Sciences', abbreviation: 'LAS' },
  ISCHOOL: { fullName: 'School of Information Sciences', abbreviation: 'iSchool' },
  LABOR: {
    fullName: 'School of Labor and Employee Relations',
    abbreviation: 'School of Labor and Employee Relations',
  },
  SOCIAL_WORK: { fullName: 'School of Social Work', abbreviation: 'School of Social Work' },
  SIEBELDESIGN: { fullName: 'Siebel Center for Design', abbreviation: 'Siebel Design' },
  SIEBELCS: { fullName: 'Siebel Center for Computer Science', abbreviation: 'Siebel CS' },
  VET_MED: { fullName: 'College of Veterinary Medicine', abbreviation: 'Vet Med' },
  NURSING: { fullName: 'College of Nursing', abbreviation: 'Nursing' },
  EXTERNAL: { fullName: 'External', abbreviation: 'External' },
} as const

export const Opportunities: CollectionConfig<'opportunities'> = {
  slug: 'opportunities',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'opportunities',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'opportunities',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Basic Info',
          fields: [
            {
              name: 'description',
              type: 'textarea',
              required: true,
              admin: {
                description: 'A detailed description of the opportunity.',
              },
            },
            {
              name: 'researchType',
              type: 'select',
              options: [
                { label: 'Internship', value: 'Internship' },
                { label: 'Undergraduate Research', value: 'Undergraduate Research' },
                { label: 'Graduate Research', value: 'Graduate Research' },
                { label: 'Other', value: 'Other' },
              ],
              required: true,
            },
            {
              name: 'modality',
              type: 'select',
              options: [
                { label: 'In-Person', value: 'in-person' },
                { label: 'Remote', value: 'remote' },
                { label: 'Hybrid', value: 'hybrid' },
              ],
              required: true,
            },
            {
              name: 'dates',
              type: 'group',
              fields: [
                {
                  name: 'start',
                  type: 'date',
                  required: true,
                },
                {
                  name: 'end',
                  type: 'date',
                  required: true,
                },
              ],
            },
            {
              name: 'deadline',
              type: 'group',
              fields: [
                {
                  name: 'isRolling',
                  type: 'checkbox',
                  label: 'Rolling Deadline',
                },
                {
                  name: 'date',
                  type: 'date',
                  admin: {
                    condition: (data, siblingData) => !siblingData?.isRolling,
                  },
                },
              ],
            },
            {
              name: 'parent-program',
              type: 'relationship',
              hasMany: false,
              relationTo: 'programs',
            },
          ],
        },
        {
          label: 'Contact & Affiliations',
          fields: [
            {
              name: 'contact',
              type: 'array',
              required: true,
              fields: [
                {
                  name: 'type',
                  type: 'select',
                  options: [
                    { label: 'Person', value: 'person' },
                    { label: 'Organization', value: 'organization' },
                  ],
                  required: true,
                },
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'email',
                  type: 'email',
                  required: true,
                },
                {
                  name: 'phone',
                  type: 'text',
                },
                {
                  name: 'department',
                  type: 'select',
                  options: Object.entries(Departments).map(([key, value]) => ({
                    label: value.fullName,
                    value: key,
                  })),
                },
                {
                  name: 'office',
                  type: 'group',
                  fields: [
                    {
                      name: 'building',
                      type: 'text',
                    },
                    {
                      name: 'room',
                      type: 'text',
                    },
                    {
                      name: 'address',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
            {
              name: 'affiliations',
              type: 'select',
              hasMany: true,
              options: Object.entries(Departments).map(([key, value]) => ({
                label: value.fullName,
                value: key,
              })),
            },
            {
              name: 'keywords',
              type: 'array',
              fields: [
                {
                  name: 'keyword',
                  type: 'text',
                },
              ],
              admin: {
                description: 'Keywords to help with searching and categorizing',
              },
            },
          ],
        },
        {
          label: 'Requirements & Restrictions',
          fields: [
            {
              name: 'restrictions',
              type: 'group',
              fields: [
                {
                  name: 'must_be_citizen',
                  type: 'checkbox',
                  label: 'Must be a U.S. Citizen',
                },
                {
                  name: 'must_be_over_18',
                  type: 'checkbox',
                  label: 'Must be 18 or older',
                },
                {
                  name: 'must_be_current_student',
                  type: 'checkbox',
                  label: 'Must be a current student',
                },
                {
                  name: 'has_required_courses',
                  type: 'checkbox',
                  label: 'Has Required Courses',
                },
                {
                  name: 'requiredCourses',
                  type: 'array',
                  admin: {
                    condition: (data, siblingData) => siblingData?.has_required_courses,
                  },
                  fields: [
                    {
                      name: 'courseCode',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'note',
                      type: 'textarea',
                    },
                  ],
                },
                {
                  name: 'has_required_hours',
                  type: 'checkbox',
                  label: 'Has Required Hours per Week',
                },
                {
                  name: 'requiredHours',
                  type: 'group',
                  admin: {
                    condition: (data, siblingData) => siblingData?.has_required_hours,
                  },
                  fields: [
                    {
                      name: 'hours',
                      type: 'number',
                      required: true,
                    },
                    {
                      name: 'note',
                      type: 'textarea',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
