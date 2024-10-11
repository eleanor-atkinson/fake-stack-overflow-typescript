import { useEffect, useState } from 'react';
import { Tag, TagData } from '../types';
import { getTagByName } from '../services/tagService';

const useTagSelected = (t: TagData) => {
  const [tag, setTag] = useState<Tag>({
    name: '',
    description: '',
  });

  useEffect(() => {
    const fetchTag = async () => {
      try {
        const res = await getTagByName(t.name);
        setTag(res || { name: 'Error', description: 'Error fetching tag' });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    };

    fetchTag();
  }, [t.name]);

  return {
    tag,
  };
};

export default useTagSelected;
