import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Opportunity } from '../../../payload-types'

export const revalidatePage: CollectionAfterChangeHook<Opportunity> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = doc.slug === 'home' ? '/' : `/opportunity/${doc.slug}`

      payload.logger.info(`Revalidating opportunity at path: ${path}`)

      revalidatePath(path)
      revalidateTag('opportunities-sitemap')
    }

    // If the page was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = previousDoc.slug === 'home' ? '/' : `/opportunity/${previousDoc.slug}`

      payload.logger.info(`Revalidating old opportunity at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('opportunities-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Opportunity> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = doc?.slug === 'home' ? '/' : `/opportunity/${doc?.slug}`
    revalidatePath(path)
    revalidateTag('opportunities-sitemap')
  }

  return doc
}
