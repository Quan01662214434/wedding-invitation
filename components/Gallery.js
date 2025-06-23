export default function Gallery({ images, layout }) {
  if (!images || images.length === 0) return null;

  return (
    <div className={`grid gap-2 mt-4 ${layout === 'layout2' ? 'grid-cols-2' : 'grid-cols-1'}`}>
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`Ảnh ${idx + 1}`}
          className="w-full rounded shadow"
        />
      ))}
    </div>
  );
}
