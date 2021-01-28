export const validation = (value) => {
  if(value.trim() !== '' ) {
    return true;
  }
  return false;
}
