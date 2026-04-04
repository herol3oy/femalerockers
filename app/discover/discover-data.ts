export type DiscoverUser = {
  id: string
  username: string
  artist_name: string
  avatar_url: string | null
  city_country: string | null
  main_instrument: string | null
  genre: string | null
  bio: string | null
  instagram_url: string | null
  video_link: string | null
  collab_status: boolean | null
  is_approved: boolean
  created_at: string
}

export const discoverUserSelect =
  'id, username, artist_name, avatar_url, city_country, main_instrument, genre, bio, instagram_url, video_link, collab_status, is_approved, created_at'

export function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function getRecentCount(users: DiscoverUser[]) {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  return users.filter((user) => new Date(user.created_at) >= thirtyDaysAgo).length
}

export function getDiscoverProfileHref(username: string) {
  return `/discover/${encodeURIComponent(username)}`
}

export function formatJoinedDate(createdAt: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(createdAt))
}