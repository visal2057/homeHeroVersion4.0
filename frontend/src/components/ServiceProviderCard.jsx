import React from 'react';
import { useNavigate } from 'react-router-dom';

const ServiceProviderCard = ({ provider, category }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    const query = new URLSearchParams({
      providerId: provider.userid,
      providerName: provider.username,
      category: provider.category || category
    }).toString();

    navigate(`/checkout?${query}`);
  };

  return (
    <div className="bg-white rounded-xl p-[24px] shadow-[0_4px_20px_-4px_rgba(6,78,59,0.05)] border border-[#eceef0] flex flex-col h-full hover:border-[#006948]/40 hover:shadow-lg transition-all group">
      <div className="flex items-center gap-[24px] mb-[24px]">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#006948]/10 flex-shrink-0">
          <img alt={provider.username} className="w-full h-full object-cover" src={`https://ui-avatars.com/api/?name=${encodeURIComponent(provider.username)}&background=006948&color=ffffff`} />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-[20px] font-semibold text-[#191c1e]">{provider.username}</h3>
            <div className="flex items-center gap-[4px] bg-[#006948]/10 text-[#006948] px-3 py-1 rounded-full border border-[#006948]/20">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
              <span className="text-[14px] font-semibold">{provider.completed_jobs || 0}</span>
            </div>
          </div>
          <p className="font-semibold text-[#006948]">{provider.category}</p>
        </div>
      </div>
      <div className="space-y-[12px] mb-[24px] flex-grow">
        <div className="flex items-center gap-[12px] text-sm text-[#3d4a42]">
          <span className="material-symbols-outlined text-[18px]">location_on</span>
          <span>{provider.district || 'Unknown location'}</span>
        </div>
        <div className="flex items-center gap-[12px] text-sm text-[#191c1e]">
          <span className="material-symbols-outlined text-[18px] text-[#006948]">work</span>
          <span className="font-medium text-[#006948]">{provider.is_online ? 'Online now' : 'Offline'}</span>
        </div>
      </div>
      <button onClick={handleBookNow} className="w-full bg-[#006948] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#00855d] transition-colors shadow-md shadow-[#006948]/20">
        Book Now
      </button>
    </div>
  );
};

export default ServiceProviderCard;
