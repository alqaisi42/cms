export default {
  isSelected(rowId) {
    return appsmith.store.selectedVstId === rowId;
  }
}
