export default function InputVert({ label, placeholder, type }) {
  return (
    <div className="flex justify-center items-center gap-2 mb-4">
      <label>{ label }</label>
      <input
        type={type}
        placeholder={placeholder}
        className="indent-1 p-2 block rounded-md text-black outline-none"
      />
    </div>
  )
}
