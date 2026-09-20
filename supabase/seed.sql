-- Optional: run after schema.sql to pre-fill your real content.
-- Everything here is editable afterwards from /admin — this just saves typing.

insert into profile (id, name, title, email, location, whatsapp, github, hero_heading, hero_subtext, about_paragraphs)
values (
  1, 'Farhat Ullah', 'Data Science Student | AI Developer | Technology Enthusiast',
  'farhatullahtajak@gmail.com', 'Peshawar, KP, Pakistan', '923437741941', 'farhatullah119',
  'Hi, I''m Farhat Ullah.',
  'I am a Data Science student and technology enthusiast interested in artificial intelligence, data analysis, software development, cybersecurity, networking, and building practical digital solutions for real-world problems.',
  array[
    'I am a Data Science student and technology enthusiast with a growing interest in Artificial Intelligence, data analysis, software development, cybersecurity, and networking.',
    'I enjoy learning by building practical projects and exploring how data and intelligent technologies can be used to solve real-world problems.',
    'My goal is to continuously strengthen my technical skills and create useful, accessible, and meaningful technology solutions.'
  ]
) on conflict (id) do nothing;

insert into settings (id, site_title, meta_description, chatbot_enabled, chatbot_system_prompt)
values (
  1, 'Farhat Ullah | Data Science Student & AI Developer',
  'Farhat Ullah is a Data Science student and AI developer interested in data science, artificial intelligence, software development, cybersecurity, networking, and practical technology solutions.',
  true,
  'You are Farhat''s AI portfolio assistant. Answer only using the portfolio context provided to you. If you don''t know something, say: "I don''t have that information in Farhat''s portfolio yet." Never invent personal information.'
) on conflict (id) do nothing;

insert into social_links (id, platform, url, visible) values
  ('github', 'GitHub', 'https://github.com/farhatullah119', true),
  ('linkedin', 'LinkedIn', '', false),
  ('facebook', 'Facebook', '', false),
  ('instagram', 'Instagram', '', false),
  ('x', 'X', '', false),
  ('youtube', 'YouTube', '', false)
on conflict (id) do nothing;

insert into skills (name, category, proficiency, order_index) values
  ('Python', 'Data Science', 'project_experience', 1),
  ('Data Analysis', 'Data Science', 'project_experience', 2),
  ('Data Cleaning', 'Data Science', 'project_experience', 3),
  ('Exploratory Data Analysis', 'Data Science', 'familiar', 4),
  ('Statistics', 'Data Science', 'familiar', 5),
  ('Data Visualization', 'Data Science', 'familiar', 6),
  ('Machine Learning', 'Data Science', 'learning', 7),
  ('Artificial Intelligence', 'Artificial Intelligence', 'project_experience', 8),
  ('Generative AI', 'Artificial Intelligence', 'project_experience', 9),
  ('Prompt Engineering', 'Artificial Intelligence', 'project_experience', 10),
  ('AI Tools', 'Artificial Intelligence', 'familiar', 11),
  ('Agentic AI', 'Artificial Intelligence', 'learning', 12),
  ('HTML', 'Development', 'project_experience', 13),
  ('CSS', 'Development', 'project_experience', 14),
  ('JavaScript', 'Development', 'familiar', 15),
  ('React', 'Development', 'familiar', 16),
  ('TypeScript', 'Development', 'learning', 17),
  ('Git', 'Development', 'project_experience', 18),
  ('GitHub', 'Development', 'project_experience', 19),
  ('Cybersecurity Fundamentals', 'Cybersecurity & Networking', 'familiar', 20),
  ('Networking Fundamentals', 'Cybersecurity & Networking', 'familiar', 21),
  ('Web Security Fundamentals', 'Cybersecurity & Networking', 'learning', 22);

insert into projects (slug, name, category, status, description, technologies, features, github_url, featured, published, order_index, overview) values
  ('hope-reach-ai', 'HopeReach AI', 'AI', 'In Progress',
   'An AI-focused project exploring how intelligent digital tools can help users access useful information and support.',
   array['Python','AI'], array[]::text[], 'https://github.com/farhatullah119/hope-reach-ai', true, true, 1,
   'An AI-focused project exploring how intelligent digital tools can help users access useful information and support.'),
  ('isf-health-hub', 'ISF Health Hub', 'Social Impact', 'Prototype / Concept',
   'A digital platform concept focused on improving access to health information, educational resources, and clinic-related services for underserved communities.',
   array[]::text[], array[]::text[], null, true, true, 2,
   'A digital platform concept — not a production healthcare system.'),
  ('ai-skillbridge', 'AI SkillBridge', 'AI', 'In Progress',
   'An AI-focused learning and productivity project exploring AI foundations, generative AI, agentic AI, modern AI tools, and AI-assisted workflows.',
   array[]::text[], array['AI Foundations','Generative AI','Agentic AI','AI Tools & Productivity','Freelancing with AI'], null, true, true, 3,
   'An AI-focused learning and productivity project.'),
  ('securenet', 'SecureNet', 'Cybersecurity', 'Coming Soon',
   'A proposed network security monitoring concept designed to help users understand network activity and improve basic cybersecurity awareness.',
   array[]::text[], array[]::text[], null, false, true, 4,
   'Concept / future project — not yet built.')
on conflict (slug) do nothing;

insert into experience (organization, position, location, category, start_date, description, published, order_index) values
  ('Commissionerate for Afghan Refugees (CAR), KP', 'Community Outreach', 'Peshawar, KP, Pakistan', 'Community Outreach', '',
   'Community outreach, information dissemination, referrals, community engagement, and supporting access to services.', true, 1),
  ('Teaching / Education Experience', 'Student Support & Mentoring', null, 'Teaching', '',
   'Student support, classroom communication, education, mentoring, and community learning.', true, 2),
  ('Pakistan Polio Eradication Program', 'Volunteer', null, 'Volunteer', '',
   'Community outreach and volunteer activities supporting the Polio Eradication Program, plus youth and environmental volunteer initiatives.', true, 3);

insert into education (institution, program, order_index) values
  ('University of Malakand', 'Data Science', 1),
  ('University of the People', 'Study Program', 2);

insert into certifications (name, issuer, topics, issue_date, order_index) values
  ('ACT AI National AI Training Programme', 'University of Malakand',
   array['AI Foundations','Generative AI','Agentic AI','AI Tools & Productivity','Freelancing with AI'], '2026-07-29', 1),
  ('Aspire Leaders Program', 'Aspire Leaders Program', array[]::text[], null, 2),
  ('UNICEF Youth Foresight Circle', 'UNICEF', array[]::text[], null, 3),
  ('Pakistan Polio Eradication Program', 'Pakistan Polio Eradication Program', array[]::text[], null, 4),
  ('Tree Plantation Drive', 'Musharaf Iqbal Foundation', array[]::text[], '2024-09-02', 5);

insert into achievements (title, category, description, date, published, order_index) values
  ('ACT AI National AI Training Programme completion', 'AI Training',
   'Completed AI Foundations, Generative AI, Agentic AI, AI Tools & Productivity, and Freelancing with AI.', '2026-07-29', true, 1),
  ('Aspire Leaders Program', 'Professional Development', 'Participated in the Aspire Leaders Program.', null, true, 2),
  ('UNICEF Youth Foresight Circle', 'Community Service', 'Participated in the UNICEF Youth Foresight Circle.', null, true, 3),
  ('Polio Eradication Program volunteer', 'Volunteer Work', 'Volunteered with the Pakistan Polio Eradication Program.', null, true, 4),
  ('Tree Plantation Drive', 'Community Service', 'Musharaf Iqbal Foundation tree plantation drive.', '2024-09-02', true, 5);
