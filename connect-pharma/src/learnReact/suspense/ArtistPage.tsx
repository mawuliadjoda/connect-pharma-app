import { Suspense } from 'react';
import Biography from './Biography';
import Albums from './Album';
import { Loading } from '../../components/Loading/Loading';

export type Artist = {
  id: string,
  name: string
}

export default function ArtistPage({ id, name }: Artist) {
  return (
    <>

      <Suspense fallback={<Loading />}>
        <h1>{name}</h1>
        <hr />
        <Biography artistId={id} />
        <h2> Album </h2>
        <hr />
        <Albums artistId={id} />
      </Suspense>
    </>
  );
}

