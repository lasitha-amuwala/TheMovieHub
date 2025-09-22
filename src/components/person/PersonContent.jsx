import PageMargin from '@/components/PageMargin';
import PersonHeader from '@/components/person/PersonHeader';
import PersonImageCarousel from '@/components/person/PersonImageCarousel';

export const PersonContent = ({ personId }) => {
  return (
    <>
      <PersonHeader personId={personId} />
      <PageMargin padding className='py-10'>
        <PersonImageCarousel personId={personId} title={''} />
        <div className='h-screen'></div>
      </PageMargin>
    </>
  );
};
