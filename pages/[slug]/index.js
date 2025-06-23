// 📁 pages/index.js
import { useState } from 'react';
import Gallery from '../components/Gallery';
import axios from 'axios';

export default function AdminPage() {
  const [form, setForm] = useState({
    groom: '', bride: '',
    groomParents: '', brideParents: '',
    time: '', address: '', mapLink: '',
    bankName: '', bankNumber: '',
    images: [], music: '', layout: 'layout1', slug: ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const reader = new FileReader();
    reader.onload = () => {
      setForm({ ...form, images: [reader.result] });
    };
    reader.readAsDataURL(files[0]);
  };

  const handleSubmit = async () => {
    if (!form.slug) return alert('Vui lòng nhập slug!');
    localStorage.setItem(form.slug, JSON.stringify(form));
    alert('Đã lưu thành công! Link: /' + form.slug);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Tạo Thiệp Cưới</h1>
      <div className="grid gap-2">
        <input name="slug" placeholder="Tên đường dẫn (vd: thaitrang)" onChange={handleChange} className="border p-2" />
        <input name="groom" placeholder="Tên chú rể" onChange={handleChange} className="border p-2" />
        <input name="bride" placeholder="Tên cô dâu" onChange={handleChange} className="border p-2" />
        <input name="groomParents" placeholder="Ba mẹ chú rể" onChange={handleChange} className="border p-2" />
        <input name="brideParents" placeholder="Ba mẹ cô dâu" onChange={handleChange} className="border p-2" />
        <input name="time" placeholder="Thời gian" onChange={handleChange} className="border p-2" />
        <input name="address" placeholder="Địa điểm" onChange={handleChange} className="border p-2" />
        <input name="mapLink" placeholder="Google Maps link" onChange={handleChange} className="border p-2" />
        <input name="bankName" placeholder="Tên ngân hàng" onChange={handleChange} className="border p-2" />
        <input name="bankNumber" placeholder="Số tài khoản" onChange={handleChange} className="border p-2" />
        <input type="file" accept="image/*" onChange={handleFileChange} className="border p-2" />
        <input name="music" placeholder="Link nhạc hoặc upload mp3" onChange={handleChange} className="border p-2" />
        <select name="layout" onChange={handleChange} className="border p-2">
          <option value="layout1">Bố cục 1</option>
          <option value="layout2">Bố cục 2</option>
        </select>
        <button onClick={handleSubmit} className="bg-blue-500 text-white py-2">Lưu Thiệp</button>
      </div>
    </div>
  );
}

// 📁 pages/[slug]/index.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Gallery from '../../components/Gallery';

export default function WeddingPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [data, setData] = useState(null);

  useEffect(() => {
    if (slug) {
      const saved = localStorage.getItem(slug);
      if (saved) setData(JSON.parse(saved));
    }
  }, [slug]);

  if (!data) return <p className="p-6">Đang tải...</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-2">Thiệp Mời Cưới</h1>
      <p className="text-center text-lg mb-4">{data.groom} & {data.bride}</p>
      <p className="text-center">Trân trọng kính mời đến dự lễ cưới của chúng tôi</p>
      <p className="text-center mt-2">Thời gian: {data.time}</p>
      <p className="text-center">Địa điểm: {data.address}</p>
      <p className="text-center text-sm text-blue-600 underline">
        <a href={data.mapLink} target="_blank">Xem bản đồ</a>
      </p>
      <div className="grid grid-cols-2 mt-4 text-sm">
        <div>
          <h3 className="font-bold">Nhà Trai:</h3>
          <p>{data.groomParents}</p>
        </div>
        <div>
          <h3 className="font-bold">Nhà Gái:</h3>
          <p>{data.brideParents}</p>
        </div>
      </div>
      <Gallery images={data.images} layout={data.layout} />
      <div className="mt-4 text-center">
        <p>Mừng cưới qua chuyển khoản:</p>
        <p className="font-semibold">{data.bankName} - {data.bankNumber}</p>
      </div>
      {data.music && (
        <audio controls autoPlay loop className="mt-4 mx-auto">
          <source src={data.music} type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
}
// Trang hiển thị thiệp theo slug
