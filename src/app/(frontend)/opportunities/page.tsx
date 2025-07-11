import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Opportunity } from '@/payload-types'
import { School, Home, Blend } from 'lucide-react'

const typeMappings: Record<
  Opportunity['researchType'][0],
  {
    color: string
    shortName: string
  }
> = {
  'Undergraduate Research': { color: 'bg-blue-100 text-blue-800', shortName: 'UG' },
  'Graduate Research': { color: 'bg-blue-300 text-blue-900', shortName: 'Grad' },
  'Postdoctoral Research': { color: 'bg-blue-900 text-gray-100', shortName: 'Postdoc' },
  'Internship': { color: 'bg-teal-100 text-teal-900', shortName: 'Internship' },
  'Other': { color: 'bg-gray-100 text-gray-900', shortName: 'Other' },
}

export default async function OpportunitiesPage() {
  const payload = await getPayload({ config: configPromise })

  const opportunities = await payload.find({
    collection: 'opportunities',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      keywords: true,
      restrictions: true,
      researchType: true,
      modality: true,
      dates: true,
      deadline: true,
    },
  })

  opportunities.docs.push(...opportunities.docs)
  opportunities.docs.push(...opportunities.docs)

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h1 className="text-4xl font-bold mb-4 text-black">Opportunities</h1>
      <p className="text-lg mb-6 text-black">Explore various opportunities available for you.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {opportunities.docs.map((opportunity, index) => (
          <div key={`${opportunity.slug}-${index}`} className="bg-gray-100 p-4 rounded shadow">
            <div className='flex flex-row gap-2 justify-between'>
            <h3 className="text-lg font-semibold">{opportunity.title}</h3>
            {opportunity.modality && opportunity.modality.length > 0 &&
            <div className='bg-gray-200 px-1.5 py-0.5 border border-1 border-color-gray-300 rounded-full flex items-center justify-center'>
              {opportunity.modality.includes("in-person") &&
              <School size={18} className='text-gray-700'/>}
{opportunity.modality.includes("remote") &&
              <Home size={18} className='text-gray-700'/>}
              {opportunity.modality.includes("hybrid") &&
              <Blend size={18} className='text-gray-700'/>}
              </div>}
            </div>
            <div className="flex flex-row flex-wrap gap-2 items-start justify-start mt-2">
              {opportunity.researchType.map((type) => (
                <div
                  key={type}
                  title={type}
                  className={`px-2 py-0.5 rounded-full ${typeMappings[type].color}`}
                >
                  {typeMappings[type].shortName}
                </div>
              ))}
            </div>
            <div className="flex flex-row flex-wrap gap-2 items-start justify-start mt-2">
              {opportunity.keywords &&
              opportunity.keywords.slice(0, 3).map((keywordObj) => (
                <div
                key={keywordObj.id ?? keywordObj.keyword}
                title={keywordObj.keyword ?? ''}
                className={`px-2 py-0.5 rounded-full bg-gray-200 text-gray-800`}
                >
                {keywordObj.keyword}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
