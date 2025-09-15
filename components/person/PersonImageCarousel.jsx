import ImageModal from '../modals/ImageModal';
import PersonImageCard from './PersonImageCard';
import EmblaCarousel from '../carousel/EmblaCarousel';

const PersonImageCarousel = ({ paths, title }) => (
  <>
    <EmblaCarousel>
      {paths.map(path => (
        <PersonImageCard path={path} title={title} disableLink={false} />
      ))}
    </EmblaCarousel>
    <ImageModal paths={paths} title={title} />
  </>
);

export default PersonImageCarousel;
