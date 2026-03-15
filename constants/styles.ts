import { Platform, StyleSheet } from 'react-native';
import { colors, MONO_FONT } from './theme';

export const sharedStyles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  screen: {
    flex: 1,
  },
  page: {
    padding: 16,
    paddingBottom: 32,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  pageSub: {
    fontSize: 12,
    color: colors.text3,
    marginBottom: 20,
    fontFamily: MONO_FONT,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: colors.text3,
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderLeftWidth: 3,
  },
  cardAvail: {
    borderLeftColor: colors.accent,
  },
  cardBorrowed: {
    borderLeftColor: colors.accent2,
  },
  cardOverdue: {
    borderLeftColor: colors.danger,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  cardSub: {
    fontSize: 12,
    color: colors.text2,
    marginTop: 2,
  },
  cardMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  chip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  chipGreen: {
    backgroundColor: 'rgba(74,222,128,0.12)',
  },
  chipPurple: {
    backgroundColor: 'rgba(124,92,252,0.15)',
  },
  chipGray: {
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  chipText: {
    fontSize: 11,
    fontWeight: '500',
    fontFamily: MONO_FONT,
  },
  copiesBadge: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.accent,
    fontFamily: MONO_FONT,
    textAlign: 'right',
  },
  copiesLabel: {
    fontSize: 10,
    color: colors.text3,
    fontFamily: MONO_FONT,
    textAlign: 'right',
  },
  penaltyVal: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: MONO_FONT,
    textAlign: 'right',
  },
  emptyBox: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    color: colors.text3,
    fontSize: 13,
  },
  formCard: {
    backgroundColor: colors.bg3,
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  formLabel: {
    fontSize: 12,
    color: colors.text2,
    fontWeight: '500',
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.bg3,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.text,
    fontSize: 14,
  },
  btn: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimary: {
    backgroundColor: colors.accent,
  },
  btnPrimaryText: {
    color: '#0f0f14',
    fontSize: 15,
    fontWeight: '700',
  },
  btnDanger: {
    backgroundColor: 'rgba(255,91,91,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,91,91,0.2)',
  },
  btnDangerText: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: '600',
  },
  btnCancel: {
    backgroundColor: colors.bg3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  btnCancelText: {
    color: colors.text2,
    fontSize: 15,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: colors.bg2,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    maxHeight: '80%' as any,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  modalSub: {
    fontSize: 12,
    color: colors.text3,
    marginBottom: 16,
    fontFamily: MONO_FONT,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 6,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.bg3,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statVal: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -1,
    fontFamily: MONO_FONT,
  },
  statKey: {
    fontSize: 11,
    color: colors.text3,
    marginTop: 2,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.text2,
    fontSize: 16,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.bg2,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 20 : 12,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  tabIconActive: {
    fontSize: 20,
    color: colors.accent,
  },
  tabIconInactive: {
    fontSize: 20,
    color: colors.text3,
  },
  tabLabelActive: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.accent,
  },
  tabLabelInactive: {
    fontSize: 10,
    fontWeight: '500',
    color: colors.text3,
  },
  selectBox: {
    backgroundColor: colors.bg3,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectText: {
    color: colors.text,
    fontSize: 14,
    flex: 1,
  },
  selectPlaceholder: {
    color: colors.text3,
    fontSize: 14,
    flex: 1,
  },
  selectArrow: {
    color: colors.text3,
    fontSize: 14,
  },
  pickerItem: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  pickerItemSelected: {
    opacity: 0.6,
  },
  pickerItemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  pickerItemSub: {
    fontSize: 12,
    color: colors.text2,
    marginTop: 2,
  },
  returnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  returnRowLabel: {
    fontSize: 13,
    color: colors.text2,
  },
  returnRowVal: {
    fontSize: 13,
    color: colors.text,
    fontFamily: MONO_FONT,
  },
  penaltyBig: {
    fontSize: 30,
    fontWeight: '700',
    fontFamily: MONO_FONT,
  },
  penaltyNote: {
    backgroundColor: 'rgba(255,91,91,0.08)',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  penaltyNoteGood: {
    backgroundColor: 'rgba(74,222,128,0.08)',
  },
  penaltyNoteText: {
    fontSize: 12,
  },
  confirmRow: {
    flexDirection: 'row',
    gap: 10,
  },
});