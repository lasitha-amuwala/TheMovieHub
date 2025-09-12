import PersonImageCard from '../person/PersonImageCard';
import EmblaCarousel from './EmblaCarousel';

const OPTIONS = { align: 'start', slidesToScroll: 'auto' };

const EmblaBaseCarousel = ({ data, modal }) => {
  return (
    <EmblaCarousel
      slides={data}
      options={OPTIONS}
      disableSlideLink={false}
      component={<PersonImageCard />}
    />
  );
};

export default EmblaBaseCarousel;
