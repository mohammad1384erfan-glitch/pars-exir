import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/seo/SEOHead';
import { Section, Breadcrumb } from '@/components/ui';

export function AboutPage() {
  return (
    <>
      <SEOHead
        title="درباره پارس اکسیر"
        description="پارس اکسیر، تأمین‌کننده پارافین صنعتی فلش ۱۲۰ و فلش ۱۴۰ در کاشان. آشنایی با کسب‌وکار پارس اکسیر."
        canonical="/about"
      />

      <div className="bg-navy-950 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'خانه', href: '/' },
            { label: 'درباره ما' },
          ]} />
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-4">درباره پارس اکسیر</h1>
          <p className="text-navy-300 mt-3 text-lg">
            تأمین‌کننده پارافین صنعتی در کاشان
          </p>
        </div>
      </div>

      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">پارس اکسیر</h2>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                پارس اکسیر یک تأمین‌کننده تخصصی پارافین صنعتی است که در کاشان، ابتدای جاده قمصر فعالیت می‌کند.
                ما پارافین صنعتی با گریدهای فلش ۱۲۰ و فلش ۱۴۰ را برای صنایع مختلف تأمین می‌کنیم.
              </p>
              <p className="text-charcoal-600 leading-relaxed mb-4">
                هدف ما ارائه محصولاتی با کیفیت قابل اطمینان، قیمت رقابتی، و خدمات مشتری‌محور است.
                مشاوره رایگان برای انتخاب گرید مناسب، یکی از خدماتی است که به مشتریان خود ارائه می‌دهیم.
              </p>
              <p className="text-charcoal-600 leading-relaxed">
                امکان خرید نقدی و همچنین خرید با مدت برای مشتریان حقوقی وجود دارد.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { icon: '📍', label: 'موقعیت', value: 'کاشان — ابتدای جاده قمصر' },
                { icon: '📦', label: 'محصولات', value: 'پارافین فلش ۱۲۰ و فلش ۱۴۰' },
                { icon: '🏭', label: 'مشتریان', value: 'صنایع شمع، لاستیک، چسب و بسته‌بندی' },
                { icon: '💳', label: 'شرایط پرداخت', value: 'نقدی و مدت‌دار' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-4 p-4 bg-industrial-50 rounded-xl border border-industrial-100">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="text-xs text-charcoal-400 font-medium">{item.label}</div>
                    <div className="text-navy-900 font-semibold text-sm">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mission */}
          <div className="bg-navy-800 text-white rounded-2xl p-10 mb-12">
            <h2 className="text-2xl font-bold mb-4">مأموریت ما</h2>
            <p className="text-navy-200 leading-relaxed text-lg">
              تأمین پارافین صنعتی با کیفیت پایدار و قیمت عادلانه، همراه با مشاوره تخصصی،
              تا صنایع ایرانی بتوانند با مواد اولیه مطمئن تولید کنند.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link to="/contact" className="btn-primary ml-4">تماس با ما</Link>
            <Link to="/products" className="btn-secondary">مشاهده محصولات</Link>
          </div>
        </div>
      </Section>
    </>
  );
}
