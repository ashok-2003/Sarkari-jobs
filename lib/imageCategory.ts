const JOB_CATEGORIES = [
  {
    name: 'UPSC',
    keywords: ['upsc', 'civil services', 'indian civil services'],
    imagePath: '/images/job_categories/upsc.jpg'
  },
  {
    name: 'SSC',
    keywords: ['ssc', 'staff selection commission'],
    imagePath: '/images/job_categories/ssc.jpg'
  },
  {
    name: 'Bihar Government',
    keywords: ['bihar', 'bpsc', 'btsc', 'shs bihar', 'csbc bihar', 'patna high court', 'phc'],
    imagePath: '/images/job_categories/bihar_govt.jpg'
  },
  {
    name: 'Railway',
    keywords: ['railway', 'rrb', 'secr', 'loco pilot', 'alp', 'dfccil'],
    imagePath: '/images/job_categories/railway.jpg'
  },
  {
    name: 'Banking & Finance',
    keywords: ['bank', 'sbi', 'ibps', 'pnb', 'union bank', 'idbi bank', 'iob', 'bob', 'financial', 'niacl', 'ippb'],
    imagePath: '/images/job_categories/bank.jpg'
  },
  {
    name: 'Defense & Police',
    keywords: ['army', 'airforce', 'navy', 'police', 'constable', 'cisf', 'itbp', 'coast guard', 'nda', 'cds', 'afcat', 'agniveer', 'military', 'defence', 'territorial army'],
    imagePath: '/images/job_categories/defense.jpg'
  },
  {
    name: 'State Public Service Commission', // Catch-all for various state PSCs
    keywords: ['uppsc', 'upsssc', 'upessc', 'mppsc', 'mpesb', 'rpsc', 'hssc', 'ukpsc', 'uksssc', 'state psc'],
    imagePath: '/images/job_categories/state_psc.jpg'
  },
  {
    name: 'National Exams/Research',
    keywords: ['nta', 'csir', 'ugc net', 'neet', 'jee', 'asrb', 'iitr'],
    imagePath: '/images/job_categories/national_exam.jpg'
  },
  {
    name: 'Academic & Medical Institute',
    keywords: ['kgmu', 'aiims', 'bhu', 'allahabad university', 'du pg', 'jnu', 'nursing officer', 'medical officer', 'assistant professor', 'teacher', 'tgt', 'pgt', 'prt', 'school', 'university'],
    imagePath: '/images/job_categories/academic_medical.jpg'
  },
  {
    name: 'Rajasthan Government',
    keywords: ['rajasthan', 'rpsc', 'rssb', 'reet', 'rajasthan police'],
    imagePath: '/images/job_categories/rajasthan_govt.jpg'
  },
  {
    name: 'Haryana Government',
    keywords: ['haryana', 'hssc', 'htet'],
    imagePath: '/images/job_categories/haryana_govt.jpg'
  },
  {
    name: 'Uttrakhand Government',
    keywords: ['uttrakhand', 'ukpsc', 'uksssc'],
    imagePath: '/images/job_categories/uttrakhand_govt.jpg'
  },
  {
    name: 'ISRO',
    keywords: ['isro', 'scientist', 'engineer'],
    imagePath: '/images/job_categories/isro.jpg'
  },
  {
    name: 'Coal/Mining',
    keywords: ['cil', 'ncl', 'coal india', 'mining'],
    imagePath: '/images/job_categories/coal_mining.jpg'
  },
  {
    name: 'Aviation',
    keywords: ['aai', 'airport', 'aviation'],
    imagePath: '/images/job_categories/aviation.jpg'
  },
  {
    name: 'Others/General Government', // A broader category for less specific government roles
    keywords: ['government job', 'sarkari', 'public sector', 'post', 'official', 'department'],
    imagePath: '/images/job_categories/general_govt.jpg' // A good fallback
  },
];

/**
 * Determines the appropriate image path based on the job title by scanning for keywords.
 * Keywords are matched case-insensitively. The function returns the path of the
 * first category whose keywords are found in the job title.
 *
 * @param jobTitle The full text string of the job posting (e.g., "Bihar BTSC Staff Nurse Online Form 2025").
 * @returns The relative path to the category-specific image (e.g., '/images/job_categories/bihar_govt.jpg'),
 * or '/images/job_categories/default.jpg' if no matching category is found.
 */
export function getCategoryImagePath(jobTitle: string): string {
  // Normalize the job title to lowercase for case-insensitive matching
  const normalizedTitle = jobTitle.toLowerCase();

  // Iterate through each defined job category
  for (const category of JOB_CATEGORIES) {
    // Check if any of the category's keywords are present in the job title
    for (const keyword of category.keywords) {
      if (normalizedTitle.includes(keyword)) {
        return category.imagePath; // Return the image path for the first matching category
      }
    }
  }

  // If no specific category keywords are found, return a general default image path.
  // Make sure this 'default.jpg' exists in your public/images/job_categories/ folder.
  return '/images/job_categories/default.jpg';
}