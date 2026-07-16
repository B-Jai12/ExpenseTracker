import { INTELLIGENT_CATEGORIES } from './merchants'

// Category config — maps every intelligent Category to display metadata
export const CATEGORY_CONFIG = INTELLIGENT_CATEGORIES
export const CATEGORIES = Object.keys(CATEGORY_CONFIG)

export const FINANCIAL_QUOTES = [
  // Saving & Spending
  'Do not save what is left after spending, but spend what is left after saving. — Warren Buffett',
  'Beware of little expenses; a small leak will sink a great ship. — Benjamin Franklin',
  'A budget tells your money where to go instead of wondering where it went. — Dave Ramsey',
  'It is not your salary that makes you rich, it is your spending habits. — Charles A. Jaffe',
  'The habit of saving is itself an education; it fosters every virtue, teaches self-denial. — T.T. Munger',
  'Never spend your money before you have it. — Thomas Jefferson',
  'Spend less than you earn. Invest the difference. Avoid debt. — JL Collins',
  'Too many people spend money they haven\'t earned to buy things they don\'t want, to impress people they don\'t like. — Will Rogers',
  'If you buy things you do not need, soon you will have to sell things you need. — Warren Buffett',
  'Annual income twenty pounds, annual expenditure twenty pounds ought and six, result misery. — Charles Dickens',
  // Wealth & Freedom
  'Wealth is not about having a lot of money; it is about having a lot of options. — Chris Rock',
  'Financial freedom is available to those who learn about it and work for it. — Robert Kiyosaki',
  'The goal is not to be rich. The goal is to be free. — T. Harv Eker',
  'Money is a terrible master but an excellent servant. — P.T. Barnum',
  'The real measure of your wealth is how much you\'d be worth if you lost all your money. — Unknown',
  'Wealth consists not in having great possessions, but in having few wants. — Epictetus',
  'The secret to getting rich is building your savings. — Suze Orman',
  'Don\'t think of it as losing money. Think of it as parting with it on an installment plan. — Unknown',
  'Rich people have big libraries. Poor people have big TVs. — T. Harv Eker',
  'It\'s not about how much money you make, but how much money you keep. — Robert Kiyosaki',
  // Investing & Growth
  'The stock market is a device for transferring money from the impatient to the patient. — Warren Buffett',
  'Compound interest is the eighth wonder of the world. He who understands it, earns it. — Albert Einstein',
  'The best investment you can make is in yourself. — Warren Buffett',
  'Price is what you pay. Value is what you get. — Warren Buffett',
  'Wide diversification is only required when investors do not understand what they are doing. — Warren Buffett',
  'The four most dangerous words in investing are: "This time it\'s different." — Sir John Templeton',
  'An investment in knowledge pays the best interest. — Benjamin Franklin',
  'How many millionaires do you know who have become wealthy by investing in savings accounts? — Robert Allen',
  'Financial intelligence is about having more options. — Robert Kiyosaki',
  'Buy when there\'s blood in the streets, even if the blood is your own. — Baron Rothschild',
  // Hard Work & Mindset
  'Success is not the key to happiness. Happiness is the key to success. — Albert Schweitzer',
  'Work like you don\'t need the money. Love like you\'ve never been hurt. — Satchel Paige',
  'The only way to do great work is to love what you do. — Steve Jobs',
  'Opportunities don\'t happen. You create them. — Chris Grosser',
  'Don\'t watch the clock; do what it does. Keep going. — Sam Levenson',
  'Success usually comes to those who are too busy to be looking for it. — Henry David Thoreau',
  'The harder I work, the luckier I get. — Samuel Goldwyn',
  'Formal education will make you a living; self-education will make you a fortune. — Jim Rohn',
  'Your income is a result of your thoughts, habits, and actions. — Unknown',
  'If you are not willing to risk the usual, you will have to settle for the ordinary. — Jim Rohn',
  // Planning & Discipline
  'In investing, what is comfortable is rarely profitable. — Robert Arnott',
  'A goal without a plan is just a wish. — Antoine de Saint-Exupéry',
  'Setting goals is the first step in turning the invisible into the visible. — Tony Robbins',
  'Failing to plan is planning to fail. — Alan Lakein',
  'Discipline is the bridge between goals and accomplishment. — Jim Rohn',
  'You must gain control over your money or the lack of it will forever control you. — Dave Ramsey',
  'Track every rupee. Because what gets measured, gets managed. — Peter Drucker (adapted)',
  'The secret of getting ahead is getting started. — Mark Twain',
  'Small daily improvements are the key to staggering long-term results. — Unknown',
  'A person who never made a mistake never tried anything new. — Albert Einstein',
  // Debt & Risk
  'The rich rule over the poor, and the borrower is slave to the lender. — Proverbs 22:7',
  'Before borrowing money from a friend, decide which you need most. — Addison H. Hallock',
  'Debt is like any other trap — easy enough to get into, hard enough to get out of. — Henry Wheeler Shaw',
  'Risk comes from not knowing what you\'re doing. — Warren Buffett',
  'Never put all your eggs in one basket. — Miguel de Cervantes',
  'Do not put off for tomorrow the savings you can do today. — Unknown',
  'Financial stress is the number one cause of relationship problems. Solve money first. — Unknown',
  'The easiest way to teach children the value of money is to borrow some from them. — Bob Orben',
  'Live beneath your means. Don\'t buy things you don\'t need. Save and invest the rest. — Charlie Munger',
  'The quickest way to double your money is to fold it in half and put it back in your pocket. — Will Rogers',
]

export const MONTHS = [
  { v: 1, l: 'January' }, { v: 2, l: 'February' }, { v: 3, l: 'March' },
  { v: 4, l: 'April' },   { v: 5, l: 'May' },       { v: 6, l: 'June' },
  { v: 7, l: 'July' },    { v: 8, l: 'August' },    { v: 9, l: 'September' },
  { v: 10, l: 'October' },{ v: 11, l: 'November' }, { v: 12, l: 'December' },
]

export const FREQUENCIES = [
  { v: 'DAILY',     l: 'Daily' },
  { v: 'WEEKLY',    l: 'Weekly' },
  { v: 'MONTHLY',   l: 'Monthly' },
  { v: 'QUARTERLY', l: 'Quarterly' },
  { v: 'YEARLY',    l: 'Yearly' },
]
