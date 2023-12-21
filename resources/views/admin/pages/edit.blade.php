@extends('admin.layouts.master')
@section('title', settings()->website_title . ' | ' . __('words.edit_page'))
@section('breadcrumb')
    <div class="d-flex align-items-baseline flex-wrap mr-5">
        <!--begin::Breadcrumb-->
        <h5 class="text-dark font-weight-bold my-1 mr-5">{{ __('words.pages') }}</h5>
        <ul class="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold p-0 my-2 font-size-sm">
            <li class="breadcrumb-item">
                <a href="{{ route('admin.home') }}" class="text-muted">{{ __('words.home') }}</a>
            </li>
            <li class="breadcrumb-item">
                <a href="{{ route('pages.index') }}" class="text-muted">{{ __('words.show_pages') }}</a>
            </li>
            <li class="breadcrumb-item">
                <span class="text-muted">{{ __('words.edit_page') }}</span>
            </li>
        </ul>
        <!--end::Breadcrumb-->
    </div>
@endsection

@extends('admin.components.create-form')
@section('form_action', route('pages.update', $page->id))
@section('form_type', 'POST')

@section('form_content')
    @method('put')
    <input type="hidden" name="id" value="{{ $page->id }}">
    <div class="card card-custom mb-2">
        <div class="card-header card-header-tabs-line">
            <div class="card-title">
                <h3 class="card-label">{{ __('words.edit_page') }}</h3>
            </div>
            @if(!config('translatable.locales') === 1)
                <div class="card-toolbar">
                    <ul class="nav nav-tabs nav-bold nav-tabs-line">
                        @foreach (config('translatable.locales') as $key => $locale)
                            <li class="nav-item">
                                <a class="nav-link  @if ($key == 0) active @endif" data-toggle="tab"
                                   href="{{ '#' . $locale }}">{{ __('words.locale-' . $locale) }}</a>
                            </li>
                        @endforeach
                    </ul>
                </div>
            @endif
        </div>
        <div class="card-body">
            <div class="tab-content">
                @foreach (config('translatable.locales') as $key => $locale)
                    <div class="tab-pane fade show @if ($key == 0) active @endif"
                         id="{{ $locale }}" role="tabpanel">
                        @if ($page->has_title == true)
                        <div class="col form-group">
                            <label>{{ __('words.title') }} - {{ __('words.locale-' . $locale) }}<span
                                    class="text-danger">
                                    * </span></label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="flaticon-edit"></i></span>
                                </div>
                                <input type="text" name="{{ $locale . '[title]' }}"
                                       placeholder="{{ __('words.title') }}"
                                       class="form-control  pl-5 min-h-40px @error($locale . '.title') is-invalid @enderror"
                                       value="{{ old($locale . '.title', $page->translate($locale)->title) }}">
                                @error($locale . '[title]')
                                <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                        @endif
                        @if ($page->has_sub_title == true)
                            <div class="col form-group">
                                <label>{{ __('words.sub_title') }} - {{ __('words.locale-' . $locale) }}<span
                                        class="text-danger"> * </span></label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="flaticon-edit"></i></span>
                                    </div>
                                    <input type="text" name="{{ $locale . '[sub_title]' }}"
                                           placeholder="{{ __('words.sub_title') }}"
                                           class="form-control  pl-5 min-h-40px @error($locale . '.sub_title') is-invalid @enderror"
                                           value="{{ old($locale . '.sub_title', $page->translate($locale)->sub_title) }}">
                                    @error($locale . '[sub_title]')
                                    <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>
                        @endif

                        @if ($page->has_description == true)
                            <div class="col form-group">
                                <label>{{ __('words.description') }}({{ __('words.locale-' . $locale) }})<span
                                        class="text-danger">*</span></label>
                                <textarea
                                    class="form-control ckeditor @error($locale . '.description') is-invalid @enderror "
                                    type="text"
                                    name="{{ $locale . '[description]' }}"
                                    rows="4">{{ old($locale . '.description', $page->translate($locale)->description) }} </textarea>
                                @error($locale . '[description]')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror
                            </div>
                        @endif
                    </div>
                @endforeach
            </div>
        </div>
    </div>

    <div class="card card-custom">
        <div class="card-body">
            <div class="row">
                @if ($page->has_link == true)
                    <div class="col form-group">
                        <label>{{ __('words.link') }}<span class="text-danger"></span></label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="flaticon-edit"></i></span>
                            </div>
                            <input type="text" name="{{ 'link' }}" placeholder="{{ __('words.link') }}"
                                   class="form-control  pl-5 min-h-40px @error('link') is-invalid @enderror"
                                   value="{{ old('link', $page->link) }}">
                            @error('[link]')
                            <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                    </div>
                @endif

                @if ($page->has_video == true)
                    <div class="col form-group">
                        <label>{{ __('words.video') }}<span class="text-danger"></span></label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="flaticon-edit"></i></span>
                            </div>
                            <input type="text" name="{{ 'video' }}" placeholder="{{ __('words.video') }}"
                                   class="form-control  pl-5 min-h-40px @error('link') is-invalid @enderror"
                                   value="{{ old('video', $page->video) }}">
                            @error('[video]')
                            <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                    </div>
                @endif
            </div>

            @if ($page->has_image == true)
                <div class="form-group row">
                    @include('admin.components.image', [
                        'label' => __('words.image'),
                        'value' => old('image', $page->image),
                        'name' => 'image',
                        'id' => 'kt_image_3',
                        'required' => false,
                    ])
                </div>
            @endif
        </div>

    </div>


    <div class="card-footer">
        <div class="row">
            <div class="col-4">
                <button type="submit" class="btn btn-block btn-outline-success">
                    {{ __('words.update') }}
                </button>
            </div>
        </div>
    </div>


@endsection