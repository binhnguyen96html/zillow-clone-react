<div class="flex w-72 flex-col gap-6">

  <div class="relative h-11 w-full min-w-[200px]">
    <input
      placeholder="Static"
      class="peer h-full w-full border-b border-blue-gray-200 
      bg-transparent pt-4 pb-1.5 font-sans 
      text-sm font-normal text-blue-gray-700 
      outline outline-0 transition-all 
      placeholder-shown:border-blue-gray-200 
      focus:border-pink-500 focus:outline-0 
      disabled:border-0 disabled:bg-blue-gray-50"
    />
    <label class="after:content[' '] pointer-events-none 
    absolute left-0 -top-2.5 flex h-full w-full 
    select-none text-sm font-normal leading-tight 
    text-blue-gray-500 transition-all after:absolute 
    after:-bottom-2.5 after:block after:w-full 
    after:scale-x-0 after:border-b-2 
    after:border-pink-500 after:transition-transform 
    after:duration-300 peer-placeholder-shown:leading-tight 
    peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm 
    peer-focus:leading-tight peer-focus:text-pink-500 
    peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 
    peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
      Static
    </label>
  </div>

  <div class="relative h-11 w-full min-w-[200px]">
    <input
      class="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
      placeholder=" "
    />
    <label class="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
      Standard
    </label>
  </div>
  <div class="relative h-10 w-full min-w-[200px]">
    <input
      class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
      placeholder=" "
    />
    <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
      Outlined
    </label>
  </div>
</div>