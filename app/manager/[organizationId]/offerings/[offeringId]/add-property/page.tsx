import FormCard from '@src/components/cards/FormCard';
import AddPropertyInfo from '@src/components/offering/AddPropertyInfo';

const AddProperty = async () => {
  return (
    <div data-test='component-create-project-page' className='h-full flex'>
      <AddPropertyInfo />
    </div>
  );
};

export default AddProperty;
