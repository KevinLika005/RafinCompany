const certificates = [
  {
    id: "cert-9001",
    name: "ISO 9001:2015",
    date: "2015-01-01",
    icon: "images/calvin-fitzerald-418x415.jpg",
    order: 1
  },
  {
    id: "cert-14001",
    name: "ISO 14001:2015",
    date: "2015-02-01",
    icon: "images/taylor-wilson-418x415.jpg",
    order: 2
  },
  {
    id: "cert-450001",
    name: "ISO 450001:2018",
    date: "2018-01-01",
    icon: "images/josh-wagner-418x415.jpg",
    order: 3
  },
  {
    id: "cert-50001",
    name: "ISO 50001:2018",
    date: "2018-02-01",
    icon: "images/edward-elliot-418x315.jpg",
    order: 4
  },
  {
    id: "cert-27001",
    name: "ISO 27001:2013",
    date: "2013-01-01",
    icon: "images/luis-maxwell-418x415.jpg",
    order: 5
  },
  {
    id: "cert-39000",
    name: "ISO 39000:2012",
    date: "2012-01-01",
    icon: "images/ken-ferguson-418x415.jpg",
    order: 6
  },
  {
    id: "cert-39001",
    name: "ISO 39001:2012",
    date: "2012-02-01",
    icon: "images/ken-ferguson-418x415.jpg",
    order: 7
  },
  {
    id: "cert-pas99",
    name: "PAS 99:2012",
    date: "2012-03-01",
    icon: "images/pass99.jpg",
    order: 8
  },
  {
    id: "cert-3834",
    name: "ISO 3834-2:2012",
    date: "2012-04-01",
    icon: "images/ww.jpg",
    order: 9
  },
  {
    id: "cert-1090",
    name: "EN 1090-1:2009+A1:2011",
    date: "2011-01-01",
    icon: "images/calvin-fitzerald-418x415.jpg",
    order: 10
  }
];

if (typeof window !== 'undefined') {
  window.siteData = window.siteData || {};
  window.siteData.certificates = certificates;
}
