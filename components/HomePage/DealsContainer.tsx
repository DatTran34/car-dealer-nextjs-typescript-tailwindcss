import React from "react";

function DealsContainer() {
  return (
    <div className="grid grid-flow-row-dense grid-rows-4 grid-cols-4 gap-4">
      <div className="bg-pink-300 col-span-4 lg:row-span-4 lg:col-span-2">
          <img src="https://cdn.imagin.studio/getImage?customer=copyright-imaginstudio&make=toyota&modelFamily=camry&modelRange=camry&angle=23&width=2600&zoomType=fullscreen" alt="" />
      </div>
      <div className="bg-pink-300 col-span-4 lg:row-span-2 lg:col-span-2"> <img src="https://cdn.imagin.studio/getImage?customer=copyright-imaginstudio&make=toyota&modelFamily=camry&modelRange=camry&angle=23&width=2600&zoomType=fullscreen" alt="" />
     </div>
      <div className="bg-pink-300 col-span-2 lg:row-span-2"> <img src="https://cdn.imagin.studio/getImage?customer=copyright-imaginstudio&make=toyota&modelFamily=camry&modelRange=camry&angle=23&width=2600&zoomType=fullscreen" alt="" />
     </div>
      <div className="bg-pink-300 col-span-2 lg:row-span-2"> <img src="https://cdn.imagin.studio/getImage?customer=copyright-imaginstudio&make=toyota&modelFamily=camry&modelRange=camry&angle=23&width=2600&zoomType=fullscreen" alt="" />
     </div>
    </div>
  );
}

export default DealsContainer;
