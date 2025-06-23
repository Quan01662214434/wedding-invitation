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
