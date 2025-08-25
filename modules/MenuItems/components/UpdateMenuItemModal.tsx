import { IsAvailable, MenuItemImage, useMenuItemsUpdate } from '@/modules/MenuItems'
import { Input, ModalOverlay, Select, Textarea,  } from '@/components';
export default function UpdateMenuItemModal() {
  const {
    toggleAvailability,
    handleFileChange,
    handleSubmit,
    closeModal,
    clearImage,
    isPending,
    setField,
    errors,
    isOpen,
    image,
    options,
    form,
  } = useMenuItemsUpdate();


  return (
    <ModalOverlay isOpen={isOpen} onClose={closeModal}>
      <form
        onSubmit={handleSubmit}
        className="w-96 bg-white p-5 max-h-[90%] rounded-lg overflow-y-auto mx-auto mt-5 "
      >
        <div className="flex flex-col gap-4">
          <MenuItemImage {...{ handleFileChange, clearImage, image }} />
          <Input
            {...{
              label: "Item Name",
              value: form.name,
              error: errors.name,
              onChange: (e) => setField("name", e.target.value),
            }}
          />
          <Input
            {...{
              label: "Price",
              value: form.price,
              error: errors.price,
              onChange: (e) => setField("price", e.target.value),
            }}
          />
          <Textarea
            {...{
              label: "Description",
              value: form.description,
              error: errors.description,
              onChange: (e) => setField("description", e.target.value),
            }}
          />
          <Select
            options={options}
            label="Category"
            value={form.categoryId}
            error={errors.categoryId}
            onChange={(e) => setField("categoryId", e.target.value)}
          />
        </div>
        <IsAvailable
          {...{ available: form.isAvailable!, toggleAvailability }}
        />
        <button
          type="submit"
          className={`py-3.5  duration-300  w-full text-white text-sm font-medium mt-5 rounded-lg shadow-md ${isPending ? "cursor-not-allowed bg-blue-200" : "active:scale-90 hover:bg-blue-700 cursor-pointer bg-blue-500"}`}
        >
          {isPending ? "Updating" : " Update Menu Item"}
        </button>
      </form>
    </ModalOverlay>
  );
}
