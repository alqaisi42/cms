export default {
  getRepetitionLabel(item) {
    const requested = item.requestedRepetition ?? 0;
    const mpRequested = item.mpRequestedRepetition ?? 0;

    return `Approved ${requested} / ${mpRequested} Requested`;
  }
};
