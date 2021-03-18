const composer = (...funcs: any) => (comp: any) => {
  return funcs.reduceRight((wrapped: any, f: any) => f(wrapped), comp);
};

export default composer;
