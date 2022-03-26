import { SimpleGrid } from '@chakra-ui/react';

type GalleryProps = {
  inventory: Object,
};

export default function Gallery({ inventory }: GalleryProps) {
  return (
    <SimpleGrid column={{ sm:2, md:4 }} spacing="3vw">
      {Object.keys(inventory).map((key) => {
        
      })}
    </SimpleGrid>
  );
}
