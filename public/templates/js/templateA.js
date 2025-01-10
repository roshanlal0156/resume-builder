$(document).ready(function () {
    let taSectionElements = document.getElementsByClassName('ta-section')
    let taSectionMenu = document.getElementById('ta-section-menu');
    let taSectionMenuAddBtn = document.getElementById('ta-section-menu-item-add');
    let taSectionMenuDeleteBtn = document.getElementById('ta-section-menu-item-delete');
    let downloadResumeBtn = document.getElementById('download-btn');
    let taSectionSubSectionSelected = null;

    // download resume on click
    downloadResumeBtn.addEventListener('click', function (event) {
        var element = document.querySelector('#page1');
        var opt = {
            margin: [0.5, 0.5, 0.0, 0.65],
            filename: 'myfile.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // New Promise-based usage:
        html2pdf().set(opt).from(element).save();
    })

    // event listenres on ta-section
    Array.from(taSectionElements).forEach(function (element) {
        element.addEventListener('click', function () {
            element.appendChild(taSectionMenu);
            taSectionMenu.style.display = 'block';
            $('.ta-section').css({ boxShadow: 'none' });
            element.style.boxShadow = '1px 1px 1px 1px black';
            taSectionSubSectionSelected = null;
        });
    });

    // hide menu on click outside page
    $(document).mouseup(function (e) {
        var container = $(".page");
        if (!container.
            is(e.target) &&
            container.
                has(e.target).
                length === 0) {
            $('#ta-section-menu').css({ display: 'none' });
            $('.ta-section').css({ boxShadow: 'none' });
            taSectionSubSectionSelected = null;
        }
    });

    // add susection when clicked on menu add
    taSectionMenuAddBtn.addEventListener('click', function (event) {
        let taSectionMenuParent = taSectionMenu.parentElement;
        // console.log(taSectionMenuParent.getAttribute('id'));
        let subSectionUL = document.querySelector('#' + taSectionMenuParent.getAttribute('id') + ' > .ta-section-sub-sections');
        let subSectionULsLiToCopy = document.querySelector('#' + taSectionMenuParent.getAttribute('id') + ' > .ta-section-sub-sections > .ta-section-sub-section-copy');
        let li = document.createElement('li');
        li.classList = ['ta-section-sub-section'];
        li.innerHTML = subSectionULsLiToCopy.innerHTML;
        subSectionUL.appendChild(li);
    })

    // capture ta-section-sub-section 
    $(document).on('click', '.ta-section-sub-section', function (event) {
        taSectionSubSectionSelected = event.currentTarget;
    })

    // delete sub section when clicked on menu delete
    taSectionMenuDeleteBtn.addEventListener('click', function (event) {
        let taSectionMenuParent = taSectionMenu.parentElement;
        let subSectionUL = document.querySelector('#' + taSectionMenuParent.getAttribute('id') + ' > .ta-section-sub-sections');
        console.log(subSectionUL)
        if (subSectionUL && subSectionUL.childElementCount > 1) {
            if (taSectionSubSectionSelected !== null) {
                subSectionUL.removeChild(taSectionSubSectionSelected);
            } else {
                subSectionUL.removeChild(subSectionUL.lastChild)
            }
        }
        taSectionSubSectionSelected = null;
    });
});
