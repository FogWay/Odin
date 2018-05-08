import CalendarLocale from 'rc-calendar/lib/locale/zh_CN';

const locale = {
  lang: {
    placeholder: '请选择日期',
    rangePlaceholder: ['开始日期', '结束日期'],
    ...CalendarLocale,
    ok: '确 定'
  }
};

export default locale;
