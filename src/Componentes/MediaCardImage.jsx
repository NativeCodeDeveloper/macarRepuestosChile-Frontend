export default function MediaCardImage({ imagenProducto, tituloProducto }) {
  return (
    <div className="relative w-[200px] h-[200px] md:w-[250px] md:h-[250px] overflow-hidden flex items-center justify-center bg-gray-50">
      <img
        src={imagenProducto}
        alt={tituloProducto}
        className="max-w-full max-h-full object-contain "
      />
    </div>
  );
}