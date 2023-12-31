

// Note: this component is written using an experimental API
// that's not yet available in stable versions of React.

import { fetchData } from "./data";

// For a realistic example you can follow today, try a framework
// that's integrated with Suspense, like Relay or Next.js.

type Album = {
  id: string,
  title: string,
  year: string
}
type AlbumsProps = {
  artistId: string
}
export default function Albums({artistId}: AlbumsProps) {
  const albums = use(fetchData(`/${artistId}/albums`));
  return (
    <ul>
      {albums.map((album: Album) => (
        <li key={album.id}>
          {album.title} ({album.year})
        </li>
      ))}
    </ul>
  );
}

// This is a workaround for a bug to get the demo running.
// TODO: replace with real implementation when the bug is fixed.
function use(promise: any) {
  if (promise.status === 'fulfilled') {
    return promise.value;
  } else if (promise.status === 'rejected') {
    throw promise.reason;
  } else if (promise.status === 'pending') {
    throw promise;
  } else {
    promise.status = 'pending';
    promise.then(
      (result: any) => {
        promise.status = 'fulfilled';
        promise.value = result;
      },
      (reason: any) => {
        promise.status = 'rejected';
        promise.reason = reason;
      },      
    );
    throw promise;
  }
}
