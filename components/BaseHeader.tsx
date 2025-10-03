import React from "react";

function BaseHeader() {
   return (
      <>
		<div className="bg-black-800 ">
			<div className="container flex justify-between items-center !py-2.5">
				<p className="text-white font-normal">
					г. Москва, ул. Орджоникидзе, д.11, стр. 11, 1 этаж, офис 108
				</p>
				<div className="flex gap-6 items-center">
					<p className="font-medium text-lg text-white">
						+7-964-522-49-66
					</p>
					<div className="flex gap-4">
						<a className="w-6 h-6 rounded bg-white flex justify-center p-0.5" href="#!">
							<img src={"/tg.svg"} alt="" />
                  </a>
                  <a className="w-6 h-6 rounded bg-white flex justify-center p-0.5" href="#!">
							<img src={"/wk.svg"} alt="" />
                  </a>
                  <a className="w-6 h-6 rounded bg-white flex justify-center p-0.5" href="#!">
							<img src={"/wat.svg"} alt="" />
						</a>
					</div>
				</div>
			</div>
         </div>
         <div className="flex gap-10 container justify-end !py-2">
            <a className="text-xl " href="#!">Блог</a>
            <a className="text-xl " href="#!">Контакты</a>
            <a className="text-xl " href="#!">Выступления</a>
         </div>
      </>
	);
}

export default BaseHeader;
