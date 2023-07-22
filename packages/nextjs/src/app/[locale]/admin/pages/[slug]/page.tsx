/**
 *  Page Page
 */

import { Editor } from '@/components/editor/editor'

import { postValidator } from '@/features/tenant_posts/posts.tenant.validators'

const post = {
  id: '1',
  title: 'My first post',
  content: {
    time: 1619011200000,
    blocks: [
      {
        type: 'twoColumn',
        data: {
          image: {
            src: 'https://images.unsplash.com/photo-1541264161754-445bbdd7de52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
            alt: 'Louvre',
            href: '#!',
            width: 600,
            height: 400,
            // sizes: '(max-width: 600px) 100vw, 600px',
            // fill: true,
            // quality: 80,
            // priority: true,
            // placeholder: 'blur',
          },
          title: 'Louvre',
          category: 'Travels',
          caption: 'Published 14.01.2022 by Lisa McCartney',
          contents: [
            `Ut pretium ultricies dignissim. Sed sit amet mi eget urna placerat
            vulputate. Ut vulputate est non quam dignissim elementum. Donec a
            ullamcorper diam.`,
            `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quae
            nulla saepe rerum aspernatur odio amet perferendis tempora
            mollitia? Ratione unde magni omnis quaerat blanditiis cumque
            dolore placeat rem dignissimos?`,
          ],
        },
      },
      // {
      //   type: 'twoColumn',
      //   data: {
      //     image: {
      //       src: 'https://mdbcdn.b-cdn.net/img/new/standard/city/028.jpg',
      //       alt: 'Louvre',
      //       href: '#!',
      //     },
      //     title: 'Exhibition in Paris',
      //     category: 'Art',
      //     caption: 'Published 12.01.2022 by Anna Doe',
      //     contents: [
      //       `Duis sagittis, turpis in ullamcorper venenatis, ligula nibh porta
      //         dui, sit amet rutrum enim massa in ante. Curabitur in justo at
      //         lorem laoreet ultricies. Nunc ligula felis, sagittis eget nisi
      //         vitae, sodales vestibulum purus. Vestibulum nibh ipsum, rhoncus
      //         vel sagittis nec, placerat vel justo. Duis faucibus sapien eget
      //         tortor finibus, a eleifend lectus dictum. Cras tempor convallis
      //         magna id rhoncus. Suspendisse potenti. Nam mattis faucibus
      //         imperdiet. Proin tempor lorem at neque tempus aliquet. Phasellus
      //         at ex volutpat, varius arcu id, aliquam lectus. Vestibulum mattis
      //         felis quis ex pharetra luctus. Etiam luctus sagittis massa, sed
      //         iaculis est vehicula ut.`,
      //     ],
      //   },
      // },
      // {
      //   type: 'twoColumn',
      //   data: {
      //     image: {
      //       src: 'https://mdbcdn.b-cdn.net/img/new/standard/city/079.jpg',
      //       alt: 'Louvre',
      //       href: '#!',
      //     },
      //     title: 'Stock market boom',
      //     category: 'Business',
      //     caption: 'Published 12.01.2022 by Anna Doe',
      //     contents: [
      //       `Duis sagittis, turpis in ullamcorper venenatis, ligula nibh porta
      //       dui, sit amet rutrum enim massa in ante. Curabitur in justo at
      //       lorem laoreet ultricies. Nunc ligula felis, sagittis eget nisi
      //       vitae, sodales vestibulum purus. Vestibulum nibh ipsum, rhoncus
      //       vel sagittis nec, placerat vel justo. Duis faucibus sapien eget
      //       tortor finibus, a eleifend lectus dictum. Cras tempor convallis
      //       magna id rhoncus. Suspendisse potenti. Nam mattis faucibus
      //       imperdiet. Proin tempor lorem at neque tempus aliquet. Phasellus
      //       at ex volutpat, varius arcu id, aliquam lectus. Vestibulum mattis
      //       felis quis ex pharetra luctus. Etiam luctus sagittis massa, sed
      //       iaculis est vehicula ut.`,
      //     ],
      //   },
      // },
      // {
      //   type: 'template',
      //   data: {
      //     url: 'https://images.unsplash.com/photo-1685208824687-9541157afdcd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      //     caption: 'a bunch of red lanterns hanging in the air by @joshuaearle',
      //     alt: 'a bunch of red lanterns hanging in the air',
      //   },
      // },
    ],

    version: '2.19.0',
  },
}

export default function PagePage() {
  const body = postValidator.parse(post)

  return <Editor post={body} />
}
