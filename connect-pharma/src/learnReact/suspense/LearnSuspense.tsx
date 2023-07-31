
import { useOutletContext } from 'react-router-dom';
import ArtistPage, { Artist } from './ArtistPage';
import Navbar from "../../components/Navbar/Index";

const artist: Artist = {
  id: 'the-beatles',
  name: 'The Beatles',
}


// https://react.dev/reference/react/Suspense
function LearnSuspense() {
  const [sidebarToggle] = useOutletContext<any>();

  return (
    <>
      <Navbar toggle={sidebarToggle} />
      <ArtistPage id={artist.id} name={artist.name} />

    </>
  );
}

export default LearnSuspense;